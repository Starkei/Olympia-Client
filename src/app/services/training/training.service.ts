import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { Filterable } from "src/app/engine/interfaces/filterable";
import { Filter } from "src/app/engine/interfaces/filter";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Training } from "src/app/interfaces/training";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  constructor(private afs: AngularFirestore, private http: HttpClient) {}

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
