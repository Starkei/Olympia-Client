import { Component, OnInit } from "@angular/core";
import { News } from "src/app/interfaces/news";
import { NewsService } from "src/app/services/news/news.service";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.scss"]
})
export class NewsComponent implements OnInit {
  news: Array<News> = [];

  constructor(private newsService: NewsService) {
    this.news = this.newsService.getNews();
  }

  ngOnInit() {}
}
