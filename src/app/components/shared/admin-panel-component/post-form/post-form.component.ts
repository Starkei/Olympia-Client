import { Component, OnInit, Input } from "@angular/core";
import { PostFormConfig } from "src/app/interfaces/configs/post-form-config";
import { Output } from "src/app/interfaces/output";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"]
})
export class PostFormComponent implements OnInit {
  @Input() config: PostFormConfig;

  constructor() {}

  ngOnInit() {}

  postData(): void {
    let output: any = {};
    for (const group of this.config.groups) {
      for (const field of group.fields) {
        output[field.dbFieldName] = field.innerText;
      }
    }
    this.config.onPost(output);
  }
}
