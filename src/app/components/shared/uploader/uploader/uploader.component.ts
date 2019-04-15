import { Component, OnInit, Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth/Auth.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"]
})
export class UploaderComponent {
  isHovering: boolean;
  public phone: number = null;
  public dateBirth: string = null;
  public name: string = null;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2020, 0, 1);
  files: File[] = [];
  formGroup: FormGroup;
  sex: string;
  // files: File[] = [];
  constructor(public auth: AuthService) {}
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
}
