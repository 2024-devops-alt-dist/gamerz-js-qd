import mongoose from 'mongoose';
import messageSchema from '../schemas/messageSchema';

const messageModel = mongoose.model('Message', messageSchema);  


export default messageModel;