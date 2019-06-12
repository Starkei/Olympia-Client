import { Component, OnInit } from "@angular/core";
import Axios, { AxiosInstance } from "axios";
import * as Parser from "rss-parser";

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { NewsService } from "src/app/services/news/news.service";
import { News } from "src/app/interfaces/models/news";
import { Observable, of } from "rxjs";
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent implements OnInit {
  private readonly axios: AxiosInstance;
  private itemsCollection: AngularFirestoreCollection<News>;
  news: News;
  constructor(private afs: AngularFirestore, private service: NewsService) {
    this.itemsCollection = afs.collection<News>("news");
    this.axios = Axios.create();
  }
  ngOnInit() {
    this.afs
      .collection<News>("news")
      .ref.orderBy("date", "desc")
      .limit(1)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let docData: any = doc.data();
          let docId: string = doc.id;
          let data: any = { id: docId, ...docData };
          let news = data as News;
          const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
          this.axios
            .get(CORS_PROXY + "https://news.tut.by/rss/sport.rss")
            .then(response => {
              const parser = new Parser();
              return parser.parseString(response.data);
            })
            .then(async (feed?: Parser.Output) => {
              for (let index = 0; index < feed.items.length; index++) {
                const element = feed.items[index];
                const d = new Date(element.pubDate);
                if (d.getTime() <= news.date.toDate().getTime()) {
                  return;
                } else {
                  let newNews: News = {};
                  newNews.reference = element.guid;
                  newNews.title = element.title;
                  newNews.description = element.contentSnippet;
                  newNews.image = element.enclosure.url;
                  newNews.date = new Date(element.pubDate);
                  this.service.addDocument(newNews);
                }
              }
            });
        });
      });
  }
}
