import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/core/auth.service";
import { trigger, transition, useAnimation } from "@angular/animations";
import { FormControl } from "@angular/forms";
import { bounce } from "ng-animate";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
  animations: [trigger("bounce", [transition("* => *", useAnimation(bounce))])]
})
export class RegistrationComponent implements OnInit {
  isClicked: boolean = false;
  selected = new FormControl(0);
  bounce: any;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2020, 0, 1);
  constructor(public auth: AuthService) {}
  ngOnInit() {
    this.isClicked = false;
  }
  registration() {
    this.selected.setValue(1);
  }
}
