import { Injectable } from "@angular/core";
import { Crowdfunding } from "src/app/classes/crowdfunding/crowdfunding";
import { Filterable } from "src/app/interfaces/filterable";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { Filter } from "src/app/interfaces/filter";
import { Output } from "src/app/interfaces/output";

@Injectable({
  providedIn: "root"
})
export class CrowdfundingService implements Filterable {
  constructor(private afs: AngularFirestore) {}

  getFilteredData(filter: Filter): Observable<Array<Crowdfunding>> {
    return this.afs
      .collection<Crowdfunding>("crowdfunding")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            let data = action.payload.doc.data();
            let id = action.payload.doc.id;
            data.id = id;
            return new Crowdfunding(data as Crowdfunding);
          });
        })
      );
  }
  /**
   *
   * @description Отправляет запрос к коллекции crowdfunding для получения всех документов,
   *  возвращает обертку из массива объектов класса Crowdfunding
   * @returns {Observable<Array<Crowdfunding>>}
   * @memberof CrowdfundingService
   */
  getAllItems(): Observable<Array<Crowdfunding>> {
    return this.afs.collection<Crowdfunding>("crowdfunding").valueChanges();
  }
}
