import { Component, OnInit, Inject } from "@angular/core";
import { Training } from "src/app/interfaces/training";
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
  selector: "app-add-training-dialog",
  templateUrl: "./add-training-dialog.component.html",
  styleUrls: ["./add-training-dialog.component.scss"]
})
export class AddTrainingDialogComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Training>;
  uid: string;
  myFirstReactiveForm: FormGroup;
  title: string = "";
  typeError: boolean = false;
  description: string = "";
  image: string = "";
  leader: string;
  price: number;
  selectedFile: File = null;
  user: User;
  userSubscribtion: Subscription;
  currency: string;
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
  constructor(
    public uploader: UploaderService,
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<AddTrainingDialogComponent>,
    public auth: AuthService,
    private fb: FormBuilder
  ) {
    this.itemsCollection = afs.collection<Training>("trainings");
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.myFirstReactiveForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(5)]],
      description: ["", [Validators.required, Validators.minLength(5)]],
      leader: ["", [Validators.required, Validators.minLength(5)]],
      price: ["", [Validators.required, Validators.minLength(1)]],
      currency: ["", [Validators.required, Validators.minLength(5)]]
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
      "trainings/"
    );
    const id = this.afs.createId();
    const title = this.title;
    const description = this.description;
    const image = url;
    const leader = this.leader;
    const currency = this.currency;
    const price = this.price;
    const item = {
      id,
      title,
      description,
      currency,
      price,
      leader,
      image
    };
    this.getInfo();
    this.userSubscribtion = this.auth.user.subscribe(data => {
      if (!data["myTrainings"]) data["myTrainings"] = [];
      data.myTrainings.push(item.id);
      this.user = data;
      this.auth.updateDocument(this.user, this.uid);
      this.userSubscribtion.unsubscribe();
    });
    this.itemsCollection.valueChanges();
    this.itemsCollection.doc(id).set(item);
    this.itemsCollection = this.afs.collection<Training>("trainings");
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
