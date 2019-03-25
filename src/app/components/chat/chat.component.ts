import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ChatService } from "src/app/services/chat-service/chat.service";
import { AuthService } from "src/app/services/auth/Auth.service";
import { Observable, of } from "rxjs";
import { User } from "src/app/interfaces/auth";
import { Messages } from "src/app/interfaces/models/messages";
import { Message } from "src/app/interfaces/models/message";
import * as _ from "lodash";
import { MatTabGroup } from "@angular/material";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  @ViewChild(MatTabGroup) scroll: MatTabGroup;
  contacts: Array<User>;
  chats: Array<Messages>;
  message: string;
  contact: User;
  title: string;

  constructor(public chatService: ChatService, public userService: AuthService) {}

  ngOnInit() {
    this.getContacts();
    this.getChats();
    this.moveScrollToBottom();
  }

  public getContacts(): void {
    this.userService.infoAboutCurrentUser().subscribe(
      (user: User): void => {
        this.contacts = [];
        user.contacts.forEach(
          (contact: string): void => {
            this.chatService.getConvertedDocumentFromCollection<User>(contact, "users").subscribe(
              (user: User): void => {
                let item = this.contacts.filter(val => val.uid == user.uid)[0];
                let index = this.contacts.indexOf(item);
                if (index >= 0) this.contacts[index] = user;
                else this.contacts.push(user);
              }
            );
          }
        );
      }
    );
  }

  public createChat(): void {
    let changed: boolean = false;
    this.userService.infoAboutCurrentUser().subscribe(
      (user: User): void => {
        if (changed) return;
        if (!this.title) this.title = "Ваш чат с " + this.contact.email;
        let chat: Messages = { recipientId: this.contact.uid, senderId: user.uid, title: this.title };
        this.chatService.createChat(chat);
        changed = true;
      }
    );
  }

  public getChats(): void {
    this.userService.infoAboutCurrentUser().subscribe(
      (user: User): void => {
        this.chats = [];
        let chatsId: Observable<Array<string>> = this.chatService.getUserChatId(user);
        if (!chatsId) return;
        this.wrapAllChats(chatsId);
      }
    );
  }

  private wrapAllChats(chatsId: Observable<string[]>): void {
    chatsId.subscribe(
      (chatIds: Array<string>): void => {
        if (!chatIds) return;
        chatIds.forEach(
          (chatId: string): void => {
            this.chatService.getChat(chatId).subscribe(
              (messages: Messages): void => {
                let item = this.chats.filter(val => val.uid == messages.uid)[0];
                let index = this.chats.indexOf(item);
                if (index >= 0) this.chats[index] = messages;
                else this.chats.push(messages);
              }
            );
          }
        );
      }
    );
  }

  public send(chatUid: string): void {
    let changed: boolean = false;
    this.userService.infoAboutCurrentUser().subscribe(
      (user: User): void => {
        if (changed) return;
        changed = true;
        let message: Message = { data: this.message, senderId: user.uid, senderName: user.email };
        this.chatService.addMessage(message, chatUid);
        this.getChats();
      }
    );
  }

  public moveScrollToBottom(): void {
    this.scroll._elementRef.nativeElement.scrollTop = this.scroll._elementRef.nativeElement.scrollHeight;
    console.log(this.scroll._elementRef.nativeElement.scrollHeight);
  }
}
