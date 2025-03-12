import mongoose from 'mongoose';
import { IUser } from '../interfaces/userInterface';


const { Schema } = mongoose;

const userSchema = new Schema<IUser>({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true
    },
    admissionText: {
        type: String,
        required: true
    },
    role: {
        type: [String],
        default: []
    },
    avatar: {
        type: String,
        default: "NO_IMAGE" 
    },
    allowNotification: {
        type: Boolean,
        default: true
    },
    seenAdmission: {
        type: Boolean,
        default: false
    },
    status: {
        type: [String],
        default: []
    }
}, { 
    timestamps: true
    } 
);

export default userSchema;