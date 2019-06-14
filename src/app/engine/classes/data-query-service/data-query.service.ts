import {
  AngularFirestore,
  DocumentChangeAction,
  Action,
  DocumentSnapshot,
  DocumentReference,
  CollectionReference,
  Query
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class DataQueryService {
  constructor(protected afs: AngularFirestore, protected collection: string) { }

  public getAllSnapshotDataFromCollection<T>(collection: string): Observable<Array<DocumentChangeAction<T>>> {
    return this.afs.collection<T>(collection).snapshotChanges();
  }

  public getAllSnapshotData<T>(): Observable<Array<DocumentChangeAction<T>>> {
    return this.getAllSnapshotDataFromCollection(this.collection);
  }

  public getAllSnapshotDataWithConditionsFromCollection<T>(
    fieldsValues: any,
    collection: string
  ): Observable<Array<DocumentChangeAction<T>>> {
    return this.afs
      .collection<T>(collection, (collectionRef: CollectionReference) => {
        let query: Query;
        for (const key in fieldsValues) {
          if (fieldsValues.hasOwnProperty(key)) {
            if (!query) query = collectionRef.where(key, "==", fieldsValues[key]);
            else query = query.where(key, "==", fieldsValues[key]);
          }
        }
        if (!query) return null;
        return query;
      })
      .snapshotChanges();
  }

  public getAllSnapshotDataWithConditions<T>(fieldsValues: any): Observable<Array<DocumentChangeAction<T>>> {
    return this.getAllSnapshotDataWithConditionsFromCollection(this.collection, fieldsValues);
  }

  public convertData<T>(snapshotData: Observable<Array<DocumentChangeAction<T>>>): Observable<Array<T>> {
    return snapshotData.pipe(
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

  public getAllConvertedDataFromCollection<T>(collection: string): Observable<Array<T>> {
    let snapshotData: Observable<Array<DocumentChangeAction<T>>> = this.getAllSnapshotDataFromCollection<T>(collection);
    return this.convertData<T>(snapshotData);
  }

  public getAllConvertedData<T>(): Observable<Array<T>> {
    return this.getAllConvertedDataFromCollection(this.collection);
  }

  public getAllConvertedDataWithConditionFromCollection<T>(collection: string, condition: any): Observable<Array<T>> {
    let snapshotData: Observable<Array<DocumentChangeAction<T>>> = this.getAllSnapshotDataFromCollection<T>(collection);
    return this.convertData<T>(snapshotData);
  }

  public getDocumentFromColletion<T>(documentId: string, collection: string): Observable<Action<DocumentSnapshot<T>>> {
    return this.afs
      .collection<T>(collection)
      .doc<T>(documentId)
      .snapshotChanges();
  }

  /**
   *
   *
   * @template T Collection class
   * @param {string} documentId Identification of document
   * @param {string} collection Collection name
   * @returns {Observable<T>}
   * @memberof DataQueryService
   */
  public getConvertedDocumentFromCollection<T>(documentId: string, collection: string): Observable<T> {
    return this.getDocumentFromColletion(documentId, collection).pipe(
      map(
        (action: Action<DocumentSnapshot<T>>): T => {
          let data: T = action.payload.data();
          let dataId: string = action.payload.id;
          return { uid: dataId, id: dataId, ...data } as T;
        }
      )
    );
  }

  /**
   *
   *
   * @template T
   * @param {T} data
   * @param {string} collection
   * @returns {string} Promise document id
   * @memberof DataQueryService
   */
  public addDocumentToCollection<T>(data: T, collection: string): Promise<string> {
    return this.afs
      .collection<T>(this.collection)
      .add(data)
      .then(
        (document: DocumentReference): string => {
          return document.id;
        }
      )
      .finally();
  }

  /**
   *
   *
   * @template T
   * @param {T} data
   * @returns {string} Promise document id
   * @memberof DataQueryService
   */
  public addDocument<T>(data: T): Promise<string> {
    return this.addDocumentToCollection(data, this.collection);
  }

  public updateDocumentForCollection<T>(data: T, documentId: string, collection: string): void {
    delete data["id"];
    delete data["uid"];
    this.afs
      .collection(collection)
      .doc(documentId)
      .update(data);
  }

  public updateDocument<T>(data: T, documentId: string): void {
    this.updateDocumentForCollection(data, documentId, this.collection);
  }

  public deleteDocumentsFromCollection<T>(dataForDelete: Array<T>, collection: string): void {
    for (const iterator of dataForDelete) {
      if (iterator["id"])
        this.afs.collection(collection).doc(iterator["id"]).delete();
      else if (iterator["uid"])
        this.afs.collection(collection).doc(iterator["uid"]).delete();
    }
  }

  public deleteDocuments<T>(dataForDelete: Array<T>): void {

    this.deleteDocumentsFromCollection(dataForDelete, this.collection);
  }
}
