import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Filterable } from "src/app/interfaces/filterable";
import { Filter } from "src/app/interfaces/filter";
import { News } from "src/app/classes/news/news";

@Injectable({
  providedIn: "root"
})
export class NewsService implements Filterable {
  constructor(private afs: AngularFirestore) {}

  getFilteredData(filter: Filter): Observable<Array<News>> {
    return this.afs
      .collection<News>("news")
      .valueChanges()
      .pipe<Array<News>>(
        map(
          (array: Array<News>): Array<News> => {
            return array.map((item: News) => new News(item));
          }
        )
      );
  }
}
