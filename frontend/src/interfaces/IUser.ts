export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string[];  // ["user", "admin"]
    avatar?: string;
    allowNotification?: boolean;
    seenAdmission?: boolean;
    status?: string[];
    createdAt?: string;
    updatedAt?: string;
  }