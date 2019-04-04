import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { FileUploader } from "src/app/engine/classes/image-uploader/FILE-uploader";

@Injectable({
  providedIn: "root"
})
export class UploaderService extends FileUploader {
  constructor(afs: AngularFireStorage) {
    super(afs, "images/");
  }
}
