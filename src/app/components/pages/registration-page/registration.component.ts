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
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
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
  isHovering: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  errorMessage: string;
  errorMessageAuth: string;
  successMessage: string;
  successMessageAuth: string;
  successMessageLegal: string;
  errorMessageLegal: string;
  formGroup: FormGroup;
  formGroup1: FormGroup;
  formGroupLegal: FormGroup;
  displayName: string;
  activityOrg: string;
  adressOrg: string;
  sex: string;
  isClicked: boolean = false;
  disabled = false;
  selected = new FormControl(0);
  bounce: any;
  serializedDate = new FormControl(new Date().toISOString());
  public phone: number = null;
  public dateBirth: Date;
  public name: string = null;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date(2020, 0, 1);

  isSmallScreen: boolean = false;
  router: any;
  constructor(
    public auth: AuthService,
    private _formBuilder: FormBuilder,
    private bp: BreakpointObserver
  ) {}
  ngOnInit() {
    this.isClicked = false;
    this.formGroup = this._formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.formGroup1 = this._formBuilder.group({
      name: ["", Validators.required],
      dateBirth: ["", Validators.required],
      sex: ["", Validators.required],
      phone: ["", Validators.required]
    });
    this.formGroupLegal = this._formBuilder.group({
      displayName: ["", Validators.required],
      activityOrg: ["", Validators.required],
      adressOrg: ["", Validators.required],
      phone: ["", Validators.required]
    });
    this.bp.observe([Breakpoints.XSmall]).subscribe((r: BreakpointState) => {
      if (r.breakpoints[Breakpoints.XSmall]) {
        this.isSmallScreen = true;
      } else {
        this.isSmallScreen = false;
      }
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
  }

  tryRegister(value) {
    this.auth.doRegister(value).then(
      res => {
        this.errorMessage = "";
        this.successMessage = "Ваш аккаунт успешно создан";
      },
      err => {
        this.errorMessage = "Ваш аккаунт не был создан";
        this.successMessage = "";
      }
    );
  }

  tryLegalRegister(value) {
    this.auth.doRegister(value).then(
      res => {
        this.successMessageLegal = "Ваш аккаунт успешно создан";
        this.errorMessageLegal = "";
      },
      err => {
        this.errorMessageLegal = "Ваш аккаунт не был создан";
        this.successMessageLegal = "";
      }
    );
  }

  tryAuth(value) {
    this.auth.login(value).then(
      res => {
        this.errorMessageAuth = "";
        this.successMessageAuth = "Ваш аккаунт авторизован";
      },
      err => {
        this.errorMessageAuth = "Ваш аккаунт не был авторизован";
        this.successMessageAuth = "";
      }
    );
  }

  registration() {
    this.selected.setValue(1);
  }
  legalRegistration() {
    this.selected.setValue(2);
  }
}
