import mongoose from 'mongoose';
import { IChannel } from '../interfaces/channelInterface';


const { Schema } = mongoose;

const channelSchema = new Schema<IChannel>({

    title: {
        type: String,
        required: true,
      },
    description: {
        type: String,
      },
    image: {
        path: String,
       },
    }, { 
        timestamps: true 
    }
);

export default channelSchema;