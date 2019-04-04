import { Uploader } from "../../interfaces/uploader";
import { AngularFireStorage } from "@angular/fire/storage";

export class FileUploader implements Uploader {
  constructor(protected afs: AngularFireStorage, protected path: string) {}

  public uploadFile(file: File): void {
    this.afs.upload(this.path + file.name, file);
  }

  public downloadFile(url: string): File {
    return null;
  }
}
