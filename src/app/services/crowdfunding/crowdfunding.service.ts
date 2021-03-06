import { Injectable } from "@angular/core";
import { Crowdfunding } from "src/app/interfaces/models/crowdfunding";
import { AngularFirestore } from "@angular/fire/firestore";
import { FilterService } from "src/app/engine/classes/filter-service/filter.service";

/**
 *
 * @description execute method ngOnDestroy for reset filters
 * @export
 * @class CrowdfundingService
 * @extends {FilterService<Crowdfunding>}
 */
@Injectable({
  providedIn: "root"
})
export class CrowdfundingService extends FilterService<Crowdfunding> {
  constructor(afs: AngularFirestore) {
    super(afs, "crowdfunding");
  }
}
