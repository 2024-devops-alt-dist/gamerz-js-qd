
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