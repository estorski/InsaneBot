export interface User {
  id: number;
}

export interface Chat {
  id: number;
}

export interface Message {
  from: User;
  chat: Chat;
  message_id: number;
  text: string;
}

export interface Update {
  update_id: number;
  message: Message;
}

export interface Store {
  lastUpdateId?: number;
}
