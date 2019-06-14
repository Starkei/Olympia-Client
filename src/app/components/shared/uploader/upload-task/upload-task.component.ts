import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth/Auth.service";
import { User } from "src/app/interfaces/auth";
import * as firebase from "firebase/app";
@Component({
  selector: "upload-task",
  templateUrl: "./upload-task.component.html",
  styleUrls: ["./upload-task.component.scss"]
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;

  task: AngularFireUploadTask;
  private itemsCollection: AngularFirestoreCollection<User>;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    const path = `usersImages/${Date.now()}_${this.file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.db
          .collection("users")
          .add({ downloadURL: this.downloadURL, path });
      })
    );
  }

  addItem(dateBirth: Date, phone: number, displayName: string, role: string) {
    dateBirth = new Date(dateBirth);
    let user = firebase.auth().currentUser;
    const users: User = {
      dateBirth,
      phone,
      email: user.email,
      photoURL: user.photoURL,
      displayName,
      role
    };
    this.itemsCollection.doc<User>(user.uid).set(users);
  }
}
