import { Component, OnInit, Input } from "@angular/core";
import { PersonalAreaService } from "../../services/peronal_area/personal-area.service";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { AuthService } from "src/app/services/auth/Auth.service";
import { User } from "src/app/interfaces/auth";
import { Event } from "src/app/classes/event/event";
import { Output } from "src/app/interfaces/output";
import { Router } from "@angular/router";
@Component({
  selector: "app-personal-area",
  templateUrl: "./personal-area.component.html",
  styleUrls: ["./personal-area.component.scss"]
})
export class PersonalAreaComponent implements OnInit {
  messages: string[] = [
    "Message1",
    "Message2",
    "Message3",
    "Message4",
    "Message5"
  ];

  private fxSizeEvent: number = 0;
  private fxSizeInfo: number = 0;
  private fxSizeCont: number = 0;
  private fxSizeStat: number = 0;
  private fxSizeUser: number = 0;
  private fxSizeChat: number = 0;
  items = this.service.items;

  user: User;
  constructor(
    private router: Router,
    public auth: AuthService,
    private service: PersonalAreaService,
    private bp: BreakpointObserver
  ) {}

  ngOnInit() {
    this.bp
      .observe([
        Breakpoints.Medium,
        Breakpoints.Small,
        Breakpoints.XSmall,
        Breakpoints.Large
      ])
      .subscribe(
        (result: BreakpointState): void => {
          if (result.breakpoints[Breakpoints.Large]) {
            this.fxSizeEvent = 25;
            this.fxSizeInfo = 100;
            this.fxSizeCont = 30;
            this.fxSizeStat = 23;
            this.fxSizeUser = 58;
            this.fxSizeChat = 42;
            console.clear();
            console.log("Large");
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.fxSizeEvent = 29;
            this.fxSizeInfo = 90;
            this.fxSizeCont = 42;
            this.fxSizeStat = 40;
            this.fxSizeUser = 55;
            this.fxSizeChat = 36;
            console.clear();
            console.log("Medium");
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.fxSizeEvent = 45;
            this.fxSizeInfo = 85;
            this.fxSizeCont = 45;
            this.fxSizeStat = 40;
            this.fxSizeUser = 41;
            this.fxSizeChat = 36;
            console.clear();
            console.log("Small");
          }
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.fxSizeEvent = 90;
            this.fxSizeInfo = 100;
            this.fxSizeCont = 100;
            this.fxSizeStat = 90;
            this.fxSizeUser = 30;
            this.fxSizeChat = 30;
            console.clear();
            console.log("XSmall");
          }
        }
      );
    this.getInfo();
  }

  getInfo() {
    this.auth.infoAboutCurrentUser().subscribe(data => (this.user = data));
  }
  rout(event: any): void {
    console.log(event);
    this.router.navigate(["info-event", { data: event }]);
  }
  getFxSize(): string {
    return this.fxSizeEvent + "%";
  }
  getFxSize2(): string {
    return this.fxSizeInfo + "%";
  }
  getFxSize3(): string {
    return this.fxSizeCont + "%";
  }
  getFxSize4(): string {
    return this.fxSizeStat + "%";
  }
  getFxSize5(): string {
    return this.fxSizeUser + "%";
  }
  getFxSize6(): string {
    return this.fxSizeChat + "%";
  }
}
