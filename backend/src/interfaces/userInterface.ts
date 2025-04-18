export interface IUser extends Document{
    name: string;  
    email: string;  
    password: string;  
    admissionText?: string; 
    role?: string[]; 
    avatar?: {
      path : string;
    }; 
    allowNotification?: boolean;  
    seenAdmission?: boolean;  
    status?: string[];  
    createdAt?: Date;  
    updatedAt?: Date;  
  }