import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Filterable } from "src/app/engine/interfaces/filterable";
import { Filter } from "src/app/engine/interfaces/filter";
import { Nutritionists } from "src/app/interfaces/models/nutritionists";

@Injectable({
  providedIn: "root"
})
export class NutritionistsService implements Filterable {
  constructor(private afs: AngularFirestore) {}

  getFilteredData(filter: Filter): Observable<Array<Nutritionists>> {
    return this.afs
      .collection<Nutritionists>("nutritionists")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            let data = action.payload.doc.data();
            let id = action.payload.doc.id;
            data.id = id;
            return data as Nutritionists;
          });
        })
      );
  }
}
