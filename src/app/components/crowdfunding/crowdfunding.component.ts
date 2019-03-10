import { Component, OnInit } from "@angular/core";
import { CrowdfundingService } from "src/app/services/crowdfunding/crowdfunding.service";
import { CrowdfundingAction } from "src/app/interfaces/crowdfunding-action";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: "app-crowdfunding",
  templateUrl: "./crowdfunding.component.html",
  styleUrls: ["./crowdfunding.component.scss"]
})
export class CrowdfundingComponent implements OnInit {
  crowdfundingActions: Array<CrowdfundingAction> = [];
  fxFlex: number = 30;
  getFlex(): string {
    return this.fxFlex + "%";
  }

  constructor(
    private crowdfundingService: CrowdfundingService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.crowdfundingActions = this.crowdfundingService.getActions();
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

  getPriceString(index: number) {
    return `Нам нужно: ${this.crowdfundingActions[index].price}$`;
  }
}
