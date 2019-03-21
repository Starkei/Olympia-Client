import { Component, OnInit, HostBinding } from "@angular/core";
import { AuthService } from "src/app/services/auth/Auth.service";
import { trigger, transition, useAnimation } from "@angular/animations";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { bounce } from "ng-animate";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
  animations: [trigger("bounce", [transition("* => *", useAnimation(bounce))])],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "ru-RU" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }
  ]
})
export class RegistrationComponent implements OnInit {
  // state: string;
  // error: any;
  errorMessage: string;
  successMessage: string;
  formGroup: FormGroup;
  formGroup1: FormGroup;
  isClicked: boolean = false;
  disabled = false;
  selected = new FormControl(0);
  bounce: any;
  serializedDate = new FormControl(new Date().toISOString());
  public phone: number = null;
  public dateBirth: string = null;
  public name: string = null;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2020, 0, 1);
  // emailFormControl = new FormControl("", [
  //   Validators.required,
  //   Validators.email
  // ]);
  constructor(public auth: AuthService, private _formBuilder: FormBuilder) {}
  ngOnInit() {
    this.isClicked = false;
    this.formGroup = this._formBuilder.group({
      // loginCtrl: ["", Validators.required],
      // passCtrl: ["", Validators.required],
      // dateCtrl: ["", Validators.required],
      // mobileCtrl: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.formGroup1 = this._formBuilder.group({
      // loginCtrl: ["", Validators.required],
      // passCtrl: ["", Validators.required],
      // dateCtrl: ["", Validators.required],
      // mobileCtrl: ["", Validators.required],
      name: ["", Validators.required],
      dateBirth: ["", Validators.required],
      // sex: ["", Validators.required],
      phone: ["", Validators.required]
    });
  }
  tryRegister(value) {
    this.auth.doRegister(value).then(
      res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      }
    );
  }

  giveInfo(value) {
    // this.auth.addItem(value);
  }

  CurrentUser() {
    this.auth.InfoAboutCurrentUser();
  }

  // updateinfouser(value) {
  //   this.auth.writeUserData(value);
  // }

  tryAuth(value) {
    this.auth.login(value).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      }
    );
  }

  registration() {
    this.selected.setValue(1);
  }
}
