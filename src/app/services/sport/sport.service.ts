import { Injectable } from "@angular/core";
import { Sport } from "src/app/interfaces/models/sport";
import { AngularFirestore } from "@angular/fire/firestore";
import * as _ from "lodash";
import { FilterService } from "src/app/engine/classes/filter-service/filter.service";

/**
 *
 * @description execute method ngOnDestroy for reset filters
 * @export
 * @class SportService
 * @extends {FilterService<Sport>}
 */
@Injectable({
  providedIn: "root"
})
export class SportService extends FilterService<Sport> {
  constructor(afs: AngularFirestore) {
    super(afs, "sports");
  }
}
