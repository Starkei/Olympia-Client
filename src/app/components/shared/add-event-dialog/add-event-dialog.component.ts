import { Component, OnInit, Inject } from "@angular/core";
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
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { auth } from "firebase";

@Component({
  selector: "app-add-event-dialog",
  templateUrl: "./add-event-dialog.component.html",
  styleUrls: ["./add-event-dialog.component.scss"]
})
export class AddEventDialogComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Event>;
  uid: string;
  myFirstReactiveForm: FormGroup;
  title: string = "";
  typeError: boolean = false;
  description: string = "";
  address: string = "";
  image: string = "";
  phoneNumbers: Array<any> = [];
  //time: string = "";
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
    private fb: FormBuilder,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public myevent: Array<any>
  ) {
    this.itemsCollection = afs.collection<Event>("events");
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.myFirstReactiveForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(5)]],
      description: ["", [Validators.required, Validators.minLength(10)]],
      phoneNumbers: ["", [Validators.required, Validators.minLength(5)]],
      address: ["", [Validators.required, Validators.minLength(5)]]
    });
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.myFirstReactiveForm.controls[controlName];
    const result = control.invalid && control.touched;
    this.typeError = result;
    return result;
  }
  async addItem() {
    let url: string = await this.uploader.uploadFile(
      this.selectedFile,
      "events/"
    );
    let i: number = 1;
    const id = this.afs.createId();
    const title = this.title;
    const description = this.description;
    const address = this.address;
    const image = url;
    const phoneNumbers = this.phoneNumbers;
    //const time = this.time;
    const item = { id, title, description, address, image, phoneNumbers };
    this.getInfo();
    this.userSubscribtion = this.auth.user.subscribe(data => {
      while (i == 1) {
        if (!data["myEvents"]) data["myEvents"] = [];
        data.myEvents.push(item.id);
        this.user = data;
        this.auth.updateDocument(this.user, this.uid);
        i--;
      }
    });
    this.itemsCollection.valueChanges();
    this.itemsCollection.doc(id).set(item);
    this.itemsCollection = this.afs.collection<Event>("events");
    this.onClose();
  }
  onClose(): void {
    this.dialogRef.close();
  }
  getInfo() {
    let info = this.auth.infoAboutCurrentUser().subscribe(data => {
      this.uid = data.uid;
    });
  }
}
