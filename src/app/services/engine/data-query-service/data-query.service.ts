import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentChangeAction
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataQueryService {
  constructor(protected afs: AngularFirestore, protected collection: string) {}

  protected getAllSnapshotData<T>(): Observable<
    Array<DocumentChangeAction<T>>
  > {
    return this.afs.collection<T>(this.collection).snapshotChanges();
  }

  protected getAllConvertedData<T>(): Observable<Array<T>> {
    return this.getAllSnapshotData<T>().pipe(
      map(
        (actions: Array<DocumentChangeAction<T>>): Array<T> => {
          return actions.map(
            (action: DocumentChangeAction<T>): T => {
              let docData: any = action.payload.doc.data();
              let docId: string = action.payload.doc.id;
              let data: any = { id: docId, ...docData };
              return data as T;
            }
          );
        }
      )
    );
  }
}
