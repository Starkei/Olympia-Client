import { Injectable } from "@angular/core";
import { DataQueryService } from "../engine/data-query-service/data-query.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Messages } from "src/app/interfaces/models/messages";
import { User } from "src/app/interfaces/auth";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "../auth/Auth.service";
import { Message } from "src/app/interfaces/models/message";

@Injectable({
  providedIn: "root"
})
export class ChatService extends DataQueryService {
  constructor(afs: AngularFirestore, private userService: AuthService) {
    super(afs, "chats");
  }

  public addMessage(message: Message, chatId: string): void {
    let changed: boolean = false;
    this.getConvertedDocumentFromCollection<Messages>(chatId, this.collection).subscribe(
      (messages: Messages): void => {
        if (changed) return;
        changed = true;
        if (!messages.messages) messages["messages"] = [];
        messages.messages.push(message);
        this.updateDocument<Messages>(messages, messages.uid);
      }
    );
  }

  public getUserChatId(user: User): Observable<Array<string>> {
    return this.getConvertedDocumentFromCollection<User>(user.uid, "users").pipe(
      map(
        (user: User): Array<string> => {
          if (user.chatId && user.chatId.length != 0) return user.chatId;
          else return null;
        }
      )
    );
  }

  public getChat(chatId: string): Observable<Messages> {
    return this.getConvertedDocumentFromCollection<Messages>(chatId, "chats");
  }

  public assignChatToUser(documentId: string, user: User): void {
    if (!user.chatId) user["chatId"] = [];
    if (!user.chatId.includes(documentId)) user.chatId.push(documentId);
    this.updateDocumentForCollection<User>(user, user.uid, "users");
  }

  public createChat(message: Messages): void {
    this.addDocument(message).then(
      (documentId: string): void => {
        let userR: Observable<User> = this.getConvertedDocumentFromCollection<User>(message.recipientId, "users");
        let userS: Observable<User> = this.getConvertedDocumentFromCollection<User>(message.senderId, "users");
        userR.subscribe(
          (user: User): void => {
            this.assignChatToUser(documentId, user);
          }
        );

        userS.subscribe(
          (user: User): void => {
            this.assignChatToUser(documentId, user);
          }
        );
      }
    );
  }
}
