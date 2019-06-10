import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { PostFormConfig } from "src/app/interfaces/configs/post-form-config";
import { Output } from "src/app/interfaces/output";
import { Field } from 'src/app/engine/interfaces/field';
import { of, Observable } from 'rxjs';
import { trigger } from '@angular/animations';

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"]
})
export class PostFormComponent implements OnInit {
  @Input() config: PostFormConfig;

  isValid: boolean;
  fields: Map<string, boolean> = new Map();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.isValid = false;
  }

  validation(event): void {
    if (!this.fields.has(event.title) || (this.fields.has(event.title) && this.fields.get(event.title) !== event.valid))
      this.fields.set(event.title, event.valid);
    else
      return;

    let flag = false;
    this.fields.forEach((value, key) => {
      if (!value) {
        if (this.isValid === true) {
          this.isValid = false;
          this.cd.detectChanges();
        }
        flag = true;
      }
    })
    if (!flag && this.isValid === false) {
      this.isValid = true;
      this.cd.detectChanges();
    }

  }

  postData(): void {
    let output: any = {};
    let checkboxData: any = {};
    for (const group of this.config.groups) {
      for (const field of group.fields) {
        switch (field.fieldType) {
          case "input":
            if (field.inputType === "datetime-local" || field.inputType === "date")
              output = this.assignValueToDBField(new Date(field.innerText), field.dbFieldName, output);
            output = this.assignValueToDBField(field.innerText, field.dbFieldName, output);
            break;
          case "checkbox":
            if (field.checked) {
              if (field.dbFieldName && field.dbFieldName[0])
                if (checkboxData[field.dbFieldName[0]])
                  checkboxData[field.dbFieldName[0]].push(field.title);
                else {
                  checkboxData[field.dbFieldName[0]] = [];
                  checkboxData[field.dbFieldName[0]].push(field.title);
                }
            }
            break;
          case "list":
            output = this.assignValueToDBField(field.values, field.dbFieldName, output);
            break;
          case "radio":
            output = this.assignValueToDBField(field.innerText, field.dbFieldName, output);
            break;
          case "select":
            output = this.assignValueToDBField(field.innerText, field.dbFieldName, output);
            break;
          case "textarea":
            output = this.assignValueToDBField(field.innerText, field.dbFieldName, output);
            break;
          case "date":
            output = this.assignValueToDBField(new Date(field.innerText), field.dbFieldName, output);
            break;
          case "button":
            if (field.buttonType === "file")
              output = this.assignValueToDBField(field.innerText, field.dbFieldName, output);
            break;
        }
      }
    }
    for (const key in checkboxData) {
      output = this.assignValueToDBField(checkboxData[key], [key], output);
    }

    console.log(output);

    //this.config.onPost(output);
  }
  private assignValueToDBField(value: any, dbFieldName: Array<string>, output: Output): Output {
    if (!dbFieldName || !value)
      return output;
    if (dbFieldName[1]) {
      if (!output[dbFieldName[0]])
        output[dbFieldName[0]] = {};
      output[dbFieldName[0]][dbFieldName[1]] = value;
    } else
      if (dbFieldName[0])
        output[dbFieldName[0]] = value;
    return output;
  }
}
