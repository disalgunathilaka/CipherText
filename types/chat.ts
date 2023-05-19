export interface IChat {
  _id: string;
  users: User[];
  name: string;
  keyPair: KeyPair;
  createdAt: string;
  updatedAt: string;
  dissabledScreenShots?: boolean;
  __v: number;
}

export interface User {
  userId: UserId;
  lastAccessTime: string;
  isJoined: boolean;
}

export interface UserId {
  _id: string;
  email: string;
}

export interface KeyPair {
  _id: string;
  privateKey: string;
  publicKey: string;
  isValid: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
