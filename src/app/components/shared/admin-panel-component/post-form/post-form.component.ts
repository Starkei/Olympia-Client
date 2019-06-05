import { Component, OnInit, Input } from "@angular/core";
import { PostFormConfig } from "src/app/interfaces/configs/post-form-config";
import { Output } from "src/app/interfaces/output";
import { Field } from 'src/app/engine/interfaces/field';

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"]
})
export class PostFormComponent implements OnInit {
  @Input() config: PostFormConfig;

  constructor() { }

  ngOnInit() { }

  checkValid(): boolean {
    for (const group of this.config.groups) {
      for (const field of group.fields) {
        if (field.isInvalid)
          return false;
      }
    }
    return true;
  }

  postData(): void {
    let output: any = {};
    let checkboxData: any = {};
    for (const group of this.config.groups) {
      for (const field of group.fields) {
        switch (field.fieldType) {
          case "input":
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
          case "select":
            output = this.assignValueToDBField(field.innerText, field.dbFieldName, output);
            break;
          case "textarea":
            output = this.assignValueToDBField(field.innerText, field.dbFieldName, output);
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
    this.config.onPost(output);
  }
  private assignValueToDBField(value: any, dbFieldName: Array<string>, output: Output): Output {
    if (!dbFieldName || !value)
      return output;
    if (dbFieldName[1]) {
      output[dbFieldName[0]] = {};
      output[dbFieldName[0]][dbFieldName[1]] = value;
    } else
      if (dbFieldName[0])
        output[dbFieldName[0]] = value;
    return output;
  }
}
