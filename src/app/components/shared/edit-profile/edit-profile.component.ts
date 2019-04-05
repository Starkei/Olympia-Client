import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/Auth.service";
import { UploaderService } from "src/app/services/uploader-service/uploader.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/interfaces/auth";
import { MatDialogRef, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from "@angular/material";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from "@angular/material-moment-adapter";
import { Moment } from "moment";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "ru-RU" },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class EditProfileComponent implements OnInit {
  public file: File;
  public user: User;
  public editFormGroup: FormGroup;

  constructor(
    public auth: AuthService,
    public uploader: UploaderService,
    public ref: MatDialogRef<EditProfileComponent>
  ) {}

  ngOnInit() {
    this.auth.infoAboutCurrentUser().subscribe(
      (userInfo: User): void => {
        this.user = userInfo;
        this.editFormGroup = new FormGroup({
          displayName: new FormControl(this.user.displayName),
          dateBirth: new FormControl(this.user.dateBirth),
          about: new FormControl(this.user.about)
        });
      }
    );
  }

  public async save(): Promise<void> {
    let uid: string = this.user.uid;

    if (!uid) {
      this.close("Ошибка при редактировании");
      return;
    }
    if (this.file) {
      let url: string = await this.uploader.uploadFile(this.file, "usersImages/");
      this.user.photoURL = url;
    }

    let data: any = this.editFormGroup.value;
    if (data.dateBirth) data.dateBirth = data.dateBirth.toDate();

    for (const key in data) {
      this.user[key] = data[key];
    }
    this.auth.updateDocument(this.user, this.user.uid);
    this.close("Изменения сохранены");
  }

  public close(message: string = "Закрыто"): void {
    this.ref.close(message);
  }

  /**
   *
   * @description Обрабатывает событие (change), устанавливает занчение {file} в первый элемент коллекции файлов.
   * @param {FileList} files - Коллекция файлов, хранит выбранные пользователем файлы.
   * @memberof ProductCreatorComponent
   */
  public setFile(files: FileList): void {
    //Установка переменной {file} в первый элемент коллекции.
    this.file = files.item(0);
  }
}
