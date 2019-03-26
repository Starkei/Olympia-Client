import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class PersonalAreaService {
  event: any;
  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<any>;
  constructor(public afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection<any>("events");
    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(action => ({
        $key: action.payload.doc.id,
        ...action.payload.doc.data()
      }));
    });
  }

  public info(event) {
    this.event = event;
  }
}
