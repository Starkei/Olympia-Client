import { Component, OnInit } from "@angular/core";
import { Event } from "src/app/interfaces/models/event";
import { UploaderService } from "src/app/services/uploader-service/uploader.service";
import { AuthService } from "src/app/services/auth/Auth.service";
import { EventService } from "src/app/services/event/event.service";
import { User } from "src/app/interfaces/auth";
import { Subscription } from "rxjs";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { auth } from "firebase";

@Component({
  selector: "app-add-event-dialog",
  templateUrl: "./add-event-dialog.component.html",
  styleUrls: ["./add-event-dialog.component.scss"]
})
export class AddEventDialogComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Event>;
  title: string = "";
  description: string = "";
  address: string = "";
  image: string = "";
  phoneNumbers: Array<any> = [];
  time: string = "";
  selectedFile: File = null;
  user: User;
  userSubscribtion: Subscription;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  constructor(
    public uploader: UploaderService,
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    public auth: AuthService,
    private eventService: EventService
  ) {
    this.itemsCollection = afs.collection<Event>("events");
  }

  ngOnInit() {}
  async addItem() {
    let url: string = await this.uploader.uploadFile(
      this.selectedFile,
      "events/"
    );
    let i: number = 1;
    let uid: string;
    const id = this.afs.createId();
    console.log(id);
    const title = this.title;
    const description = this.description;
    const address = this.address;
    const image = url;
    const phoneNumbers = this.phoneNumbers;
    const time = this.time;
    const item = { id, title, description, address, image, phoneNumbers };
    //this.itemsCollection.add(item);
    let info = this.auth.infoAboutCurrentUser().subscribe(data => {
      uid = data.uid;
      console.log(this.itemsCollection.valueChanges());
      console.log(this.itemsCollection.doc(id).set(item));
    });
    this.userSubscribtion = this.auth.user.subscribe(data => {
      while (i == 1) {
        data.myEvents.push(item.id);
        this.user = data;
        this.auth.updateDocument(this.user, uid);
        i--;
      }
    });
  }
  onClose(): void {
    this.dialogRef.close();
  }
  // public getFavoriteProduct(): void {
  //   this.userSubscribtion = this.auth.user.subscribe(data => {
  //     for (let favprod of data.favoriteProduct) {
  //       this.eventService.getConvertedDocumentFromCollection(
  //         favprod,
  //         "products"
  //       ).subscribe(data => {
  //         this.prod.push(data);
  //       });
  //     }
  //   });
  // }
}
