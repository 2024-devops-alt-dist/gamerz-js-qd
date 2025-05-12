import ChatBubble from "../../components/ChatBubble"
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { IChannel } from "../../interfaces/IChannel";
import { fetchChannelById } from "../../services/channelServices";


function ChannelPage() {

  const { id } = useParams<{ id: string }>();
  const [channel, setChannel] = useState<IChannel | null>(null);

  useEffect(() => {
    if (id) {
      fetchChannelById(id).then(data => setChannel(data)).catch(console.error);
    }
  }, [id]);

  if (!channel) return <div>Chargement...</div>;

  return (
    <>
      <h1> {channel.title} </h1>
      <p>{channel.description}</p>
      <img src={channel.image?.path} alt={channel.title} />
        
        <ChatBubble />

    </>
  )
}

export default ChannelPage
