export interface IChannel extends Document{
    title: string,
    description: string,
    image?: {
        path : string;
      }; 
    createdAt?: Date;  
    updatedAt?: Date;  
  }