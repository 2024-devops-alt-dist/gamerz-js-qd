import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { postUser } from '../services/userService';
import { useNavigate } from 'react-router';

// Définition du schéma de validation avec Zod
const formSchemaSignUp = z.object({
    name: z.string().min(3, "the name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "The password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "The password confirmation must be at least 8 characters long"),
    avatar: z.instanceof(FileList).transform((fileList) => fileList[0]).optional(),
    admissionText: z.string().min(100, "The admission text must be at least 100 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
});

// Définition du type TypeScript basé sur le schéma Zod
type FormData = z.infer<typeof formSchemaSignUp>;

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchemaSignUp),
    });

    const navigate = useNavigate();
    
    const onSubmit = async (data: FormData) => {
        console.log("Form submitted", data);
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("admissionText", data.admissionText);

        if (data.avatar) {
            formData.append("avatar", data.avatar); 
        }

        // Appel vers l'API
        try {
            await postUser(formData);
            navigate("/login"); // Redirection vers la page de connexion après l'inscription
        }
        catch (error) {
            console.error("Error during user creation", error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Create your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Champ Nom */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    {...register("name")}
                                    autoComplete='name'
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                            </div>
                        </div>

                        {/* Champ Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                            </div>
                        </div>

                        {/* Champ Mot de passe */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    type="password"
                                    {...register("password")}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                            </div>
                        </div>

                        {/* Champ Confirmation du mot de passe */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    {...register("confirmPassword")}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        {/* Champ Photo */}
                        <div>
                            <label htmlFor="avatar" className="block text-sm font-medium text-gray-900">
                                Avatar (Optionnal)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="avatar"
                                    type="file"
                                    {...register("avatar")}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                                {errors.avatar && <p className="mt-1 text-sm text-red-600">{errors.avatar.message}</p>}
                            </div>
                        </div>

                        {/* Champ Texte d'admission */}
                        <div>
                            <label htmlFor="admissionText" className="block text-sm font-medium text-gray-900">
                                Admission Text
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="admissionText"
                                    {...register("admissionText")}
                                    placeholder="Minimum 100 characters"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                                {errors.admissionText && <p className="mt-1 text-sm text-red-600">{errors.admissionText.message}</p>}
                            </div>
                        </div>

                        {/* Bouton Submit */}
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white font-semibold shadow-xs hover:bg-indigo-500 focus:outline-2 focus:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
