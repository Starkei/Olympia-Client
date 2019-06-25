import { Component, OnInit, Inject } from "@angular/core";
import { Sport } from "src/app/interfaces/models/sport";
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
  selector: "app-add-sport-dialog",
  templateUrl: "./add-sport-dialog.component.html",
  styleUrls: ["./add-sport-dialog.component.scss"]
})
export class AddSportDialogComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Sport>;
  uid: string;
  myFirstReactiveForm: FormGroup;
  title: string = "";
  typeError: boolean = false;
  description: string = "";
  image: string = "";
  currency: string;
  price: number;
  contraindications: Array<string>;
  phoneNumbers: Array<string>;
  type: Array<string>;
  selectedFile: File = null;
  user: User;
  userSubscribtion: Subscription;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  constructor(
    public uploader: UploaderService,
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<AddSportDialogComponent>,
    public auth: AuthService,
    private fb: FormBuilder
  ) {
    this.itemsCollection = afs.collection<Sport>("sports");
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.myFirstReactiveForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(5)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      currency: ["", [Validators.required, Validators.minLength(1)]],
      price: ["", [Validators.required, Validators.minLength(1)]],
      phoneNumbers: ["", [Validators.required, Validators.minLength(6)]],
      contraindications: ["", [Validators.required, Validators.minLength(5)]],
      type: ["", [Validators.required, Validators.minLength(1)]]
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
      "sport/"
    );
    const id = this.afs.createId();
    const title = this.title;
    const description = this.description;
    const image = url;
    const currency = this.currency;
    const phoneNumbers = this.phoneNumbers;
    const contraindications = this.contraindications;
    const price = this.price;
    const type = this.type;
    const item = {
      id,
      title,
      description,
      image,
      currency,
      price,
      phoneNumbers,
      contraindications,
      type
    };
    this.getInfo();
    this.userSubscribtion = this.auth.user.subscribe(data => {
      if (!data["mySports"]) data["mySports"] = [];
      data.mySports.push(item.id);
      this.user = data;
      this.auth.updateDocument(this.user, this.uid);
      this.userSubscribtion.unsubscribe();
    });
    this.itemsCollection.valueChanges();
    this.itemsCollection.doc(id).set(item);
    this.itemsCollection = this.afs.collection<Sport>("sports");
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
