export interface IMessage {
  _id: string;
  text: string;
  chatId: string;
  sendBy: string;
  sentLocation: SentLocation;
  createdAt: string;
  updatedAt: string;
  __v: number;
  senderKey: string;
}

export interface SentLocation {
  lat: number;
  lng: number;
}
