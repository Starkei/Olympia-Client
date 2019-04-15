import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Filterable } from "src/app/engine/interfaces/filterable";
import { Filter } from "src/app/engine/interfaces/filter";
import { Observable } from "rxjs";
import { Event } from "src/app/interfaces/models/event";
import { map } from "rxjs/operators";
import { Output } from "src/app/interfaces/output";

@Injectable({
  providedIn: "root"
})
export class EventService implements Filterable {
  constructor(private afs: AngularFirestore) {}

  getFilteredData(filter: Filter): Observable<Array<Event>> {
    return this.afs
      .collection<Event>("events")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            let data = action.payload.doc.data();
            let id = action.payload.doc.id;
            data.id = id;
            return data as Event;
          });
        })
      );
  }

  getAllData(): Observable<Array<Event>> {
    return this.afs
      .collection("events")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            let data: Output = action.payload.doc.data();
            let id = action.payload.doc.id;
            data.id = id;
            return data as Event;
          });
        })
      );
  }
}
