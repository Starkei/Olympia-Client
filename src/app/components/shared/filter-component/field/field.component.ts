import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Field } from "src/app/engine/interfaces/field";
import { FormControl, Validators } from '@angular/forms';
import { UploaderService } from 'src/app/services/uploader-service/uploader.service';

@Component({
  selector: "app-field",
  templateUrl: "./field.component.html",
  styleUrls: ["./field.component.scss"]
})
export class FieldComponent implements OnInit {
  @Input() field: Field;
  @Output() pressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  control: FormControl;
  errors: any[] = [];
  file: File;

  constructor(public uploader: UploaderService) {
  }

  ngOnInit() {
    let validators = [];
    if (this.field.fieldType === "input") {
      if (this.field.inputType === "email") {
        validators.push(Validators.email);
        this.errors.push({ message: "Неправильный эелетронный адрес", errorType: "email" });
      }
      if (this.field.inputType === "number") {
        if (this.field.maxValue || this.field.maxValue === 0) {
          validators.push(Validators.max(this.field.maxValue));
          this.errors.push({ message: `Больше чем ${this.field.maxValue}`, errorType: "max" });
        }
        if (this.field.minValue || this.field.minValue === 0) {
          validators.push(Validators.min(this.field.minValue));
          this.errors.push({ message: `Меньше чем ${this.field.minValue}`, errorType: "min" });
        }

      }
    }
    if (this.field.required) {
      validators.push(Validators.required);
      this.errors.push({ message: "Это поле обязательно", errorType: "required" });
    }
    this.control = new FormControl('', validators);
    this.control.valueChanges.subscribe((value) => {
      if (!this.control.invalid) {
        if (this.field.fieldType === "input" || this.field.fieldType === "textarea")
          this.field.innerText = value;
        this.field.isInvalid = false;
      }
    })
  }

  press(): void {
    if (this.field.fieldType == "checkbox") this.field.checked = !this.field.checked;
    this.pressed.emit(true);
  }

  getErrorMessage() {
    for (const err of this.errors) {
      if (this.control.hasError(err.errorType)) {
        this.field.isInvalid = true;
        return err.message;
      }
    }
    this.field.isInvalid = false;
  }

  setFile(files: FileList): void {
    this.file = files.item(0);
    this.saveFile();
  }

  public saveFile(): void {
    if (this.file) {
      this.field.isInvalid = true;
      this.uploader.uploadFile(this.file, this.field.pathToImages).then(
        (url) => {
          this.field.innerText = url;
          this.field.isInvalid = false;
        }
      );
    }
  }
}
