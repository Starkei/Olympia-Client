import { Component, OnInit } from "@angular/core";
import { Training } from "../../interfaces/training";
import { TrainingService } from "../../services/training/training.service";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";

@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.scss"]
})
export class TrainingComponent implements OnInit {
  training: Array<Training> = [];

  private flexSize: number = 30;
  items= this.service.items;
  constructor(
    public service: TrainingService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    //this.getFire();
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(
        (result: BreakpointState): void => {
          if (result.breakpoints[Breakpoints.Medium]) {
            this.flexSize = 45;
          }
        }
      );
    this.breakpointObserver.observe(["(max-width: 1010px)"]).subscribe(
      (result: BreakpointState): void => {
        if (result.matches) this.flexSize = 100;
      }
    );
  }
  getFormattedFlexSize(): string {
    return this.flexSize + "%";
  }
  // getFire() {
  //   this.service.getFire().subscribe(data => (this.items = data));
  // }
}
