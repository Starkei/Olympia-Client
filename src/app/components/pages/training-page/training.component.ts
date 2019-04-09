import { Component, OnInit } from "@angular/core";
import { TrainingService } from "src/app/services/training/training.service";
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
  fxFlex: number = 30;
  constructor(
    public trainingService: TrainingService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe(["(max-width: 870px)"])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.fxFlex = 44;
        } else this.fxFlex = 30;
      });
  }

  getFlex(): string {
    return this.fxFlex + "%";
  }

  ngOnInit() {}
}
