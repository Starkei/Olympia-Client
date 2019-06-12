import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Filterable } from "src/app/engine/interfaces/filterable";
import { Filter } from "src/app/engine/interfaces/filter";
import { News } from "src/app/interfaces/models/news";
import { FilterService } from "src/app/engine/classes/filter-service/filter.service";

@Injectable({
  providedIn: "root"
})
export class NewsService extends FilterService<News> {
  news: Observable<News> = of(null);
  constructor(afs: AngularFirestore) {
    super(afs, "news");
  }

  getFilteredData(filter: Filter): Observable<Array<News>> {
    return this.afs
      .collection<News>("news")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            let data = action.payload.doc.data();
            let id = action.payload.doc.id;
            data.id = id;
            return data as News;
          });
        })
      );
  }
  getLast(): Observable<News> {
    this.afs
      .collection<News>("news")
      .ref.limit(1)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let docData: any = doc.data();
          let docId: string = doc.id;
          let data: any = { id: docId, ...docData };
          this.news = of(data as News);
        });
      });

    return this.news;
  }
}
