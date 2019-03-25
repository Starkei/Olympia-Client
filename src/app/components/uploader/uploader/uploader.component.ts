import { Component, OnInit, Injectable } from "@angular/core";

import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"]
})
export class UploaderComponent {
  isHovering: boolean;

  files: File[] = [];
  formGroup: FormGroup;
  // files: File[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
}
