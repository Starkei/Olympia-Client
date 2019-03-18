import { Injectable } from "@angular/core";
import { Crowdfunding } from "src/app/classes/crowdfunding/crowdfunding";
import { Filterable } from "src/app/interfaces/filterable";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { Filter } from "src/app/interfaces/filter";

@Injectable({
  providedIn: "root"
})
export class CrowdfundingService implements Filterable {
  constructor(private afs: AngularFirestore) {}

  getFilteredData(filter: Filter): Observable<Array<Crowdfunding>> {
    return this.afs
      .collection<Crowdfunding>("crowdfunding")
      .valueChanges()
      .pipe<Array<Crowdfunding>>(
        map(
          (array: Array<Crowdfunding>): Array<Crowdfunding> => {
            return array.map((item: Crowdfunding) => new Crowdfunding(item));
          }
        )
      );
  }

  getAllItems(): Observable<Array<Crowdfunding>> {
    return this.afs.collection<Crowdfunding>("crowdfunding").valueChanges();
  }
}
