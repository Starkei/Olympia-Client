import { Injectable } from "@angular/core";
import { News } from "src/app/interfaces/news";

@Injectable({
  providedIn: "root"
})
export class NewsService {
  news: Array<News> = [];

  constructor() {
    this.news.push({
      title: "В честь восьмого марта устроен забег",
      image: "https://cdn12.img.sputnik.by/images/103394/28/1033942851.jpg",
      description:
        "Забег начнется 8 марта в 12:00. Девушки будут бежать по главному столичному проспекту от площади Независимости до площади Победы и обратно. В нем примут участие только женщины — мужчины на этом мероприятии выступят в качестве волонтеров. Чтобы пробежать дистанцию, необходимо зарегистрироваться. Последний день регистрации — 6 марта."
    });
    this.news.push({
      title: "В честь восьмого марта устроен забег",
      image: "https://cdn12.img.sputnik.by/images/103394/28/1033942851.jpg",
      description:
        "Забег начнется 8 марта в 12:00. Девушки будут бежать по главному столичному проспекту от площади Независимости до площади Победы и обратно. В нем примут участие только женщины — мужчины на этом мероприятии выступят в качестве волонтеров. Чтобы пробежать дистанцию, необходимо зарегистрироваться. Последний день регистрации — 6 марта."
    });
  }

  getNews(): Array<News> {
    return this.news;
  }
}