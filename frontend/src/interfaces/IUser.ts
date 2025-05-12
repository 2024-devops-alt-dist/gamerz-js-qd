export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    admissionText?: string;
    role: string[];
    avatar?: string;
    allowNotification?: boolean;
    seenAdmission?: boolean;
    status?: string[];
    createdAt?: string;
    updatedAt?: string;
  }
