import { Component, OnInit, Input } from "@angular/core";

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
  @Input() size: number;

  constructor() {}

  ngOnInit() {}
}
