import { Component, OnInit, Injectable } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { User } from "src/app/interfaces/auth";
import * as firebase from "firebase/app";
@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"]
})
export class UploaderComponent {
  isHovering: boolean;
  private itemsCollection: AngularFirestoreCollection<User>;
  files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
  addItem(
    dateBirth: Date,
    phone: number,
    sex: string,
    displayName: string,
    role: string
  ) {
    dateBirth = new Date(dateBirth);
    let user = firebase.auth().currentUser;
    const users: User = {
      dateBirth,
      phone,
      sex,
      email: user.email,
      photoURL: user.photoURL,
      displayName,
      role
    };
    console.log(user.uid);
    this.itemsCollection.doc<User>(user.uid).set(users);
  }
}
