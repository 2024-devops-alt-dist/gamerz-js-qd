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
    
    <div className="bg-gray-800">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            Liste des channels
            </h2>
            <p className="mt-6 text-lg/8 text-pretty text-gray-300">
              Rejoignez les mondes du gaming
            </p>
              <div className ="mt-3">
              {channels && channels[0] && channels.map((oneChannel, index) => (
                <ListChans channel={oneChannel} index={index}/>
              ))}
              </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              alt="App screenshot"
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={1824}
              height={1080}
              className="absolute top-0 left-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>

      
        
    </>
  )
}

export default ChannelList