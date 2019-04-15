import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { SportService } from "src/app/services/sport/sport.service";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Filter } from "src/app/engine/interfaces/filter";
import { SportFilter } from "src/app/classes/sport-filter/sport-filter";
import { FilterComponent } from "../../shared/filter-component/filter/filter.component";

@Component({
  selector: "app-sport-page",
  templateUrl: "./sport-page.component.html",
  styleUrls: ["./sport-page.component.scss"]
})
export class SportPageComponent implements OnInit, OnDestroy {
  @ViewChild(FilterComponent) filterComponent: FilterComponent;

  filter: Filter;
  fxFlex: number = 30;

  constructor(public sportService: SportService, private breakpointObserver: BreakpointObserver) {
    this.filter = new SportFilter(this.sportService);
  }

  ngOnInit() {
    this.breakpointObserver.observe(["(max-width: 640px)"]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.fxFlex = 100;
      }
    });

    this.breakpointObserver.observe(["(max-width: 870px)"]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.fxFlex = 44;
      } else this.fxFlex = 30;
    });
  }

  ngOnDestroy(): void {
    this.sportService.ngOnDestroy();
  }

  getFlex(): string {
    return this.fxFlex + "%";
  }
}
