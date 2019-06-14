import { Component, OnInit } from "@angular/core";
import { Output } from "src/app/interfaces/output";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import * as _ from "lodash";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "src/app/interfaces/auth";
import { AuthService } from "src/app/services/auth/Auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-output-details",
  templateUrl: "./output-details.component.html",
  styleUrls: ["./output-details.component.scss"]
})
export class OutputDetailsComponent implements OnInit {
  private outputCollection: AngularFirestoreCollection<Output>;
  output: Output;
  adware: Observable<Array<Output>>;

  collection: string;
  user: User;
  username: string;
  comment: string;
  uid: string;
  messages: any[] = [];
  userSubscribtion: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    public auth: AuthService
  ) {
    this.getInfoAboutUser();
    this.route.paramMap.subscribe(
      (data: ParamMap): void => {
        this.collection = data.get("collection");
        this.afs
          .collection<Output>(data.get("collection"))
          .doc(data.get("uid"))
          .valueChanges()
          .subscribe(
            (d: Output): void => {
              this.output = d;
              this.uid = data.get("uid");
              this.collection = data.get("collection");
              this.afs
                .collection(this.collection)
                .doc(this.uid)
                .valueChanges()
                .subscribe(doc => {
                  if (doc["comments"]) this.messages = doc["comments"];
                });
              this.getFirstFive(this.collection);
            }
          );
      }
    );
  }
  addComment() {
    let sub = this.afs
      .collection<Output>(this.collection)
      .doc(this.uid)
      .valueChanges()
      .subscribe(data => {
        if (!data["comments"]) data["comments"] = [];
        data["comments"].push({
          auth: this.username,
          content: this.comment,
          date: new Date()
        });
        this.afs
          .collection<Output>(this.collection)
          .doc(this.uid)
          .set(data);
        sub.unsubscribe();
      });
  }

  public updateDocumentForCollection<T>(
    data: T,
    documentId: string,
    collection: string
  ): void {
    this.afs
      .collection(collection)
      .doc(documentId)
      .update(data);
  }
  getInfoAboutUser() {
    this.userSubscribtion = this.auth.user.subscribe(data => {
      this.user = data;
      this.username = data.userName || data.displayName;
    });
  }

  getFirstFive(collection: string): void {
    this.afs
      .collection<Output>(collection, ref => {
        return ref.where("type", "==", this.output.type).limit(5);
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          actions = actions.filter(
            val => val.payload.doc.data().title != this.output.title
          );
          return actions.map(action => {
            let data = action.payload.doc.data();
            let id = action.payload.doc.id;
            data.id = id;
            return { id, ...data } as Output;
          });
        })
      )
      .pipe(data => (this.adware = data));
  }

  public convertSecondsToHours(seconds: number): string {
    let h: number = seconds / 3600;
    let m: number = (seconds % 3600) / 60;
    let hours: string = h > 0 ? (h < 10 ? "0" + h : h + "") : "00";
    let minutes: string = m > 0 ? (m < 10 ? "0" + m : m + "") : "00";
    return hours + ":" + minutes;
  }

  getLink(url: string): string {
    return "http://" + url;
  }

  follow(item: Output): void {
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: this.collection }
    ]);
  }

  redirect(url: string): void {
    window.open(url, "_blank");
  }

  toLocalDate(date: Array<any>): Array<any> {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    return date.map(d => d.toDate().toLocaleString(options));
  }

  ngOnInit() {}
}
