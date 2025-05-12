export interface IMessage extends Document{
    text: string,
    channel_id: Int16Array,
    user_id: Int16Array,
    createdAt?: Date;  
    updatedAt?: Date;  
  }