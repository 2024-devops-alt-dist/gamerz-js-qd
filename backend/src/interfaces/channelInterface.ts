import mongoose from 'mongoose';

export interface IChannelInput {
    title: string;
    description: string;
    image?: { path: string };
  }

  export interface IChannel extends Document, IChannelInput {
    createdAt?: Date;
    updatedAt?: Date;
  }