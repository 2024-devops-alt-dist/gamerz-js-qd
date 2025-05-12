
export interface User {
    name: string;  
    email: string;  
    password: string;  
    admissionText?: string; 
    role?: string[]; 
    avatar?: File;
    allowNotification?: boolean;  
    seenAdmission?: boolean;  
    status?: string[];  
    createdAt?: Date;  
    updatedAt?: Date;  
  }

export interface Channel {
    _id: string; 
    title: string; 
    description: string; 
    image?: { path: string }; 
    createdAt: string; 
    updatedAt: string; 
  }
    
export interface Message {
  _id: string; 
  text: string; 
  channel_id: string; 
  user_id: string; 
  createdAt: string; 
  updatedAt: string; 
}