import { Component, OnInit } from "@angular/core";
import { Sport } from "src/app/interfaces/sport";
import { SportService } from "src/app/services/sport/sport.service";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: "app-sport-page",
  templateUrl: "./sport-page.component.html",
  styleUrls: ["./sport-page.component.scss"]
})
export class SportPageComponent implements OnInit {
  sports: Array<Sport> = [];
  fxFlex: number = 30;

  constructor(
    private sportService: SportService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(["(max-width: 640px)"])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.fxFlex = 100;
        }
      });

    this.breakpointObserver
      .observe(["(max-width: 870px)"])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.fxFlex = 44;
        } else this.fxFlex = 30;
      });
    this.sports = this.sportService.getSports();
  }

  getFlex(): string {
    return this.fxFlex + "%";
  }
}
