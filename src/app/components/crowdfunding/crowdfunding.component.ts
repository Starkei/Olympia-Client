import { Component, OnInit } from "@angular/core";
import { CrowdfundingService } from "src/app/services/crowdfunding/crowdfunding.service";
import { CrowdfundingAction } from "src/app/interfaces/crowdfunding-action";

@Component({
  selector: "app-crowdfunding",
  templateUrl: "./crowdfunding.component.html",
  styleUrls: ["./crowdfunding.component.scss"]
})
export class CrowdfundingComponent implements OnInit {
  crowdfundingActions: Array<CrowdfundingAction> = [];

  constructor(private crowdfundingService: CrowdfundingService) {
    this.crowdfundingActions = this.crowdfundingService.getActions();
  }

  ngOnInit() {}

  getPriceString(index: number) {
    return `Нам нужно: ${this.crowdfundingActions[index].price}$`;
  }
}
