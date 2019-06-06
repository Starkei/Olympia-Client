import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Filter } from "src/app/engine/interfaces/filter";
import { Training } from "src/app/interfaces/training";
import { FilterService } from 'src/app/engine/classes/filter-service/filter.service';

@Injectable({
  providedIn: "root"
})
export class TrainingService extends FilterService<Training>{
  constructor(afs: AngularFirestore) {
    super(afs, "trainings");
  }

  getFilteredData(filter: Filter): Observable<Array<Training>> {
    return this.afs
      .collection<Training>("trainings")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            let data = action.payload.doc.data();
            let id = action.payload.doc.id;
            data.id = id;
            return data as Training;
          });
        })
      );
  }
}
