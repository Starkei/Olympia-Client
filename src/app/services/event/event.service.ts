import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Filterable } from "src/app/engine/interfaces/filterable";
import { Filter } from "src/app/engine/interfaces/filter";
import { Observable } from "rxjs";
import { Event } from "src/app/interfaces/models/event";
import { map } from "rxjs/operators";
import { Output } from "src/app/interfaces/output";
import { FilterService } from "src/app/engine/classes/filter-service/filter.service";

@Injectable({
  providedIn: "root"
})
export class EventService extends FilterService<Event> {
  constructor(afs: AngularFirestore) {
    super(afs, "events");
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
