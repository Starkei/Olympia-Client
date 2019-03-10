import { Component, OnInit, Input } from "@angular/core";
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints
} from "@angular/cdk/layout";

@Component({
  selector: "app-horizontal-card",
  templateUrl: "./horizontal-card.component.html",
  styleUrls: ["./horizontal-card.component.scss"]
})
export class HorizontalCardComponent implements OnInit {
  @Input() image: string;
  @Input() description: string;
  @Input() title: string;
  @Input() price: string;
  @Input() moreInfo: string;
  @Input() size: number = 35;

  metrix: string = "vh";
  fontSize: number = 18;
  cardSize: number = 35;

  constructor(private breakPointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakPointObserver
      .observe([
        Breakpoints.Large,
        Breakpoints.XLarge,
        Breakpoints.Medium,
        Breakpoints.Small,
        Breakpoints.XSmall,
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait
      ])
      .subscribe((result: BreakpointState) => {
        if (result.breakpoints[Breakpoints.Large]) {
          this.fontSize = 16;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.fontSize = 14;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.fontSize = 12;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.fontSize = 6;
        }
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.fontSize = 4;
        }
        if (result.breakpoints[Breakpoints.HandsetPortrait]) {
          this.metrix = "vw";
        }

        if (result.breakpoints[Breakpoints.HandsetLandscape]) {
          this.metrix = "vh";
        }
      });
  }

  getFontSize(): string {
    return this.fontSize + "px";
  }

  getSize(): string {
    return this.cardSize + this.metrix;
  }
}
