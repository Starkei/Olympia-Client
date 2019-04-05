import { Component, OnInit } from "@angular/core";
import { BreakPoint } from "@angular/flex-layout";
import { CardEatService } from "src/app/services/card-eat/CardEat.service";
import { CardEat } from "src/app/interfaces/CardEat";
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints
} from "@angular/cdk/layout";

@Component({
  selector: "app-car-about-eat",
  templateUrl: "./car-about-eat.component.html",
  styleUrls: ["./car-about-eat.component.scss"]
})
export class CarAboutEatComponent implements OnInit {
  isSmallScreen: boolean = false;
  image: Array<CardEat> = [];
  displayedColumns: string[] = [
    "Group",
    "Proteins",
    "Fats",
    "Carbohydrates",
    "Energy"
  ];
  constructor(
    private bpo: BreakpointObserver,
    private CardEatService: CardEatService
  ) {
    this.image = this.CardEatService.getImage();
  }

  ngOnInit() {
    this.bpo.observe([Breakpoints.XSmall]).subscribe((r: BreakpointState) => {
      if (r.breakpoints[Breakpoints.XSmall]) {
        this.isSmallScreen = true;
      } else {
        this.isSmallScreen = false;
      }
    });
  }
}
