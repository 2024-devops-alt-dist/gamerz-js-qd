import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, XCircle } from "lucide-react";
import clsx from "clsx";
import { useAuthentification } from "../context/AuthContext";
import { fetchUsers, updateUserSeenAdmission } from "../services/userService";
import { IUser } from "../interfaces/IUser";

export default function Dashboard() {
  const [applications, setApplications] = useState<IUser[]>([]);
  const navigate = useNavigate();
  const { user, isLoading } = useAuthentification();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.role?.includes("admin")) {
        navigate("/unauthorized");
        return;
      }

      try {
        const users = await fetchUsers();
        const filtered = users.filter((u) => u.admissionText);
        setApplications(filtered);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    if (!isLoading) {
      fetchApplications();
    }
  }, [user, navigate, isLoading]);

  const toggleSeenAdmission = async (id: string, current: boolean = false) => {
    try {
      const updatedUser = await updateUserSeenAdmission(id, !current);
      setApplications((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, seenAdmission: updatedUser.seenAdmission } : c
        )
      );
    } catch (error) {
      console.error("Error updating seenAdmission:", error);
    }
  };

  if (isLoading) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#2c2f33] text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">Admin Dashboard</h1>

      <div className="space-y-4">
        {applications.map((c) => (
          <div
            key={c._id}
            className={clsx(
              "flex items-center justify-between rounded-xl px-6 py-4 shadow transition-colors",
              c.seenAdmission ? "bg-green-900/60" : "bg-red-900/60"
            )}
          >
            <div>
              <p className="text-lg font-semibold">{c.name}</p>
              <p className="text-sm text-gray-300">{c.email}</p>
              <p className="text-sm italic mt-1 text-gray-400">{c.admissionText}</p>
            </div>

            <div className="flex items-center gap-4">
              {c.seenAdmission ? (
                <CheckCircle className="text-green-400" />
              ) : (
                <XCircle className="text-red-400" />
              )}
              <input
                type="checkbox"
                checked={!!c.seenAdmission}
                onChange={() => toggleSeenAdmission(c._id!, !!c.seenAdmission)}
                className="w-5 h-5 rounded text-indigo-500 focus:ring-indigo-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
