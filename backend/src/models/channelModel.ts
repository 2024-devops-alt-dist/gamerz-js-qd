import mongoose from 'mongoose';
import channelSchema from '../schemas/channelSchema';

const channelModel = mongoose.model('Channel', channelSchema);  


export default channelModel;