import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, AfterViewInit, ElementRef } from "@angular/core";
import { Field } from "src/app/engine/interfaces/field";
import { FormControl, Validators } from '@angular/forms';
import { UploaderService } from 'src/app/services/uploader-service/uploader.service';
import { MatListOption, MatDatepicker } from '@angular/material';
import { of, BehaviorSubject } from 'rxjs';

@Component({
  selector: "app-field",
  templateUrl: "./field.component.html",
  styleUrls: ["./field.component.scss"]
})
export class FieldComponent implements OnInit {
  @Input() field: Field;
  @Output() pressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() valid: EventEmitter<any> = new EventEmitter<any>();

  errors: any[] = [];
  file: File;

  constructor(public uploader: UploaderService) {
  }

  ngOnInit() {

    if (this.field.fieldType === "input") {
      if (this.field.lower) {
        this.errors.push({ message: `Увеличьте значение`, errorType: "lowerT" });
      }
      if (this.field.greater) {
        this.errors.push({ message: `Уменьшите значение`, errorType: "greaterTrue" });
      }
      if (this.field.inputType === "email") {
        this.errors.push({ message: "Неправильный эелетронный адрес", errorType: "email" });
      }
      if (this.field.inputType === "number") {
        if (this.field.maxValue || this.field.maxValue === 0) {
          this.errors.push({ message: `Больше чем ${this.field.maxValue}`, errorType: "maxValue" });
        }
        if (this.field.minValue || this.field.minValue === 0) {
          this.errors.push({ message: `Меньше чем ${this.field.minValue}`, errorType: "minValue" });
        }

      }
      if (this.field.inputType === "mobile") {
        this.errors.push({ message: `Неверный формат номера`, errorType: "phone" });
      }
    }
    if (this.field.required) {
      this.errors.push({ message: "Это поле обязательно", errorType: "required" });
    }
    this.valid.emit({ title: this.field.inputPlaceHolder, valid: true });
  }

  press(): void {
    if (this.field.fieldType == "checkbox") this.field.checked = !this.field.checked;
    this.pressed.emit(true);
  }

  getErrorMessage(control: FormControl) {
    for (const err of this.errors) {
      if (control.hasError(err.errorType)) {
        if (this.field.inputType === "mobile") {
          this.field.isInvalid = true;
        }
        this.valid.emit({ title: this.field.inputPlaceHolder, valid: false });
        return err.message;
      }
    }
  }

  setValid(): void {
    if (this.field.inputType === "mobile") {
      this.field.isInvalid = false;
    }
    this.valid.emit({ title: this.field.inputPlaceHolder, valid: true });
  }

  setFile(files: FileList): void {
    this.file = files.item(0);
    this.saveFile();
  }

  public saveFile(): void {
    if (this.file) {
      this.valid.emit({ title: this.field.buttonType, valid: false });
      this.uploader.uploadFile(this.file, this.field.pathToImages).then(
        (url) => {
          this.field.innerText = url;
          this.valid.emit({ title: this.field.buttonType, valid: true });
        }
      );
    }
  }

  public deleteSelected(selected: Array<MatListOption>) {
    this.field.selectItems = this.field.selectItems.filter((value, index) => {
      for (const iterator of selected) {
        let label: string = iterator.getLabel().trim();
        if (value.includes(label)) {
          this.field.values = this.field.values.filter((val, i) => i !== index);
          return false;
        }
      }
      return true;
    });
  }

  public mobile(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


}
