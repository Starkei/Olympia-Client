import { Injectable } from "@angular/core";
import { Sport } from "src/app/classes/sport/sport";
import { AngularFirestore } from "@angular/fire/firestore";
import { Filterable } from "src/app/interfaces/filterable";
import { Filter } from "src/app/interfaces/filter";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SportService implements Filterable {
  constructor(private afs: AngularFirestore) {}

  getFilteredData(filter: Filter): Observable<Array<Sport>> {
    return this.afs
      .collection("sports")
      .valueChanges()
      .pipe<Array<Sport>>(
        map(
          (array: Array<Sport>): Array<Sport> => {
            return array.map((item: Sport) => new Sport(item));
          }
        )
      );
  }
}
