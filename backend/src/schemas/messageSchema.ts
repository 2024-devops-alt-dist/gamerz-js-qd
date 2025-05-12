import mongoose from 'mongoose';
import { IMessage } from '../interfaces/messageInterface';


const { Schema } = mongoose;

const messageSchema = new Schema<IMessage>({

    text: {
        type: String,
        required: true,
      },
    channel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
      },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
    }, { 
        timestamps: true 
    }
);

export default messageSchema;