import ChatBubble from "../../components/ChatBubble"
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { IChannel } from "../../interfaces/IChannel";
import { fetchChannelById } from "../../services/channelServices";
import { socket } from "../../socket";
import { connect } from "http2";

type Message = {
  text: string;
  channel_id: string;
  user_id: string;
  timestamp: string;
};


function ChannelPage() {

  const { id } = useParams<{ id: string }>();
  const [channel, setChannel] = useState<IChannel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!id) return;

    // Connexion socket et join de la channel
    socket.connect();
    console.log('connection')
    socket.emit("join_channel", id);

    socket.on("channel_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit("leave_channel", id);
      socket.off("channel_message");
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchChannelById(id).then(data => setChannel(data)).catch(console.error);
    }
  }, [id]);

  const sendMessage = () => {
    if (!input.trim() || !id) return;
    socket.emit("channel_message", { channel: id, message: input });
    setInput("");
  };

  if (!channel) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-gray-800 min-h-100">
      <div className="p-4 w-100">
        <h1 className="text-xl  mb-2 text-white">{channel.title}</h1>
        <p className="mb-2 text-white">{channel.description}</p>
      </div>
      {channel.image?.path && <img className="mb-4" src={channel.image.path} alt={channel.title} />}

      <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} />
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md text-white "
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Écris ton message ici..."
        />
        <button
          className="bg-red-400 text-white px-4 py-2 rounded-r-md"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChannelPage;

