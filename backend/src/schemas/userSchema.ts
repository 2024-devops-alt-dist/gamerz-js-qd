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
        required: true
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
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}
);

export default userSchema;