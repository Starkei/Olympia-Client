import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { NutritionistsService } from "src/app/services/nutritionists/nutritionists.service";

@Component({
  selector: "app-nutritionists",
  templateUrl: "./nutritionists.component.html",
  styleUrls: ["./nutritionists.component.scss"]
})
export class NutritionistsComponent implements OnInit {
  fxFlex: number = 30;
  constructor(
    public nutritionistsService: NutritionistsService,
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
