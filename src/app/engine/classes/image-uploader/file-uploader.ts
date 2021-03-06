import { Uploader } from "../../interfaces/uploader";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";

export class FileUploader implements Uploader {
  constructor(protected afs: AngularFireStorage) {}

  public uploadFile(file: File, path: string): Promise<string> {
    return this.afs.upload(path + file.name, file).then(snapshot => {
      return snapshot.ref.getDownloadURL();
    });
  }

  public downloadFile(url: string): File {
    return null;
  }
}
