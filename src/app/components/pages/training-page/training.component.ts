import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { TrainingService } from "src/app/services/training/training.service";
import { FilterComponent } from "../../shared/filter-component/filter/filter.component";
import { TrainingFilter } from "src/app/classes/training-filter/training-filter";

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
  @ViewChild(FilterComponent) filterComponent: FilterComponent;
  filter: TrainingFilter;
  fxFlex: number = 30;
  constructor(
    public trainingService: TrainingService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.filter = new TrainingFilter(this.trainingService);
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
  ngOnDestroy(): void {
    this.trainingService.ngOnDestroy();
  }
}
