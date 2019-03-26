import { Output } from "@angular/compiler/src/core";
import { Message } from "./message";

export interface Messages extends Output {
  uid?: string;
  senderId?: string;
  recipientId?: string;
  messages?: Array<Message>;
  title?: string;
}
