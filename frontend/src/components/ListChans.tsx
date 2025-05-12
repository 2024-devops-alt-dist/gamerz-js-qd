import { IChannel } from "../interfaces/IChannel";

interface Props {
    channel: IChannel;
    index: number;
  }
export default function ListChans ({ channel, index }: Props) {

    
    return (
        <div key={index} className="my-5">
            <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={channel.image && channel.image.path || "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{channel.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{channel.description.substring(0,50)} ...</p>
            </div>
        </a>
        </div>
    )
}