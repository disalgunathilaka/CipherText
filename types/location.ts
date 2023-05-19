export interface ChatLocationForUser {
  userId: string;
  user: User;
  lastAccessTime: string;
  lastMessageLocation: LastMessageLocation;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LastMessageLocation {
  lat: number;
  lng: number;
}
