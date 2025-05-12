import { useState, useEffect } from "react";
import ListChans from "../components/ListChans";
import {fetchChannels} from "../services/channelServices";
import { IChannel } from "../interfaces/IChannel";

function ChannelList() {

  
 const [channels, setChannels] = useState<IChannel[]>();
   

  useEffect(() => {
    // Create an scoped async function in the hook
    async function getAllChannels() {
      try {
        const data = await fetchChannels();
        console.log(data);
        setChannels(data);
  
      }
      catch (error) {
        console.error("Error while fetching channels", error);
      }
      console.log("channels fetched successfully", );
      console.log(channels);
    };
       // Execute the created function directly
    getAllChannels();
  }, []);

  return (
    <>
        <div>Liste des channels</div>
      {channels && channels[0] && channels.map((oneChannel, index) => (
        <ListChans channel={oneChannel} index={index}/>
      ))}
        
    </>
  )
}

export default ChannelList