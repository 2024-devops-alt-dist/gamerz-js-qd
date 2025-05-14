import { IChannel } from "../interfaces/IChannel";
import { Link } from "react-router";
import VideoGame from '../assets/video-games.png'

interface Props {
    channel: IChannel;
    index: number;
  }
export default function ListChans ({ channel }: Props) {

    
    return (
        <div className="my-5">
            <Link to={`/channels/${channel._id}`} className="flex flex-col items-center  rounded-lg shadow-sm md:flex-row md:max-w-xl  border-gray-700 bg-gray-800 hover:bg-gray-700">
            {!channel.image?.path && <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={VideoGame} alt="" />}
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={channel.image?.path} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl  tracking-tight text-white">{channel.title}</h5>
                <p className="mb-3 font-normal  text-gray-400">{channel.description.substring(0,50)} ...</p>
            </div>
        </Link>
        </div>
    )
}