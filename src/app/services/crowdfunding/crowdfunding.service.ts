import { Injectable } from "@angular/core";
import { Crowdfunding } from "src/app/interfaces/models/crowdfunding";
import { Filterable } from "src/app/interfaces/filterable";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { Filter } from "src/app/interfaces/filter";
import { Output } from "src/app/interfaces/output";
import { extend } from "webdriver-js-extender";
import { FilterService } from "../engine/filter-service/filter.service";

@Injectable({
  providedIn: "root"
})
export class CrowdfundingService extends FilterService<Crowdfunding> {
  constructor(afs: AngularFirestore) {
    super(afs, "crowdfunding");
  }
}
