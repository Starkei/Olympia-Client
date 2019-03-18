import { Component, OnInit } from "@angular/core";
import { NewsService } from "src/app/services/news/news.service";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"]
})
export class NewsComponent implements OnInit {
  fxFlex: number = 30;
  constructor(
    public newsService: NewsService,
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
