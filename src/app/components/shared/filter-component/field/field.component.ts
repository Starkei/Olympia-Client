import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Field } from "src/app/engine/interfaces/field";

@Component({
  selector: "app-field",
  templateUrl: "./field.component.html",
  styleUrls: ["./field.component.scss"]
})
export class FieldComponent implements OnInit {
  @Input() field: Field;

  @Output() pressed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  press(): void {
    if (this.field.fieldType == "checkbox") this.field.checked = !this.field.checked;
    this.pressed.emit(true);
  }
}
