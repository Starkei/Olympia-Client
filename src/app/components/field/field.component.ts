import { Component, OnInit, Input } from "@angular/core";
import { Field } from "src/app/interfaces/field";

@Component({
  selector: "app-field",
  templateUrl: "./field.component.html",
  styleUrls: ["./field.component.scss"]
})
export class FieldComponent implements OnInit {
  @Input() field: Field;

  constructor() {}

  ngOnInit() {}
}
