import { Component, OnInit, ViewChild } from "@angular/core";
import { CrowdfundingService } from "src/app/services/crowdfunding/crowdfunding.service";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { CrowdfundingFilter } from "src/app/classes/crowdfunding-filter/crowdfunding-filter";
import { FilterComponent } from "../filter/filter.component";

@Component({
  selector: "app-crowdfunding",
  templateUrl: "./crowdfunding.component.html",
  styleUrls: ["./crowdfunding.component.scss"]
})
export class CrowdfundingComponent implements OnInit {
  @ViewChild(FilterComponent) filterComponent: FilterComponent;

  fxFlex: number = 30;
  filter: CrowdfundingFilter;
  getFlex(): string {
    return this.fxFlex + "%";
  }

  constructor(
    public crowdfundingService: CrowdfundingService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.filter = new CrowdfundingFilter(this.crowdfundingService);
  }

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
  }
}
