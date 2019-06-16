import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { Filter } from "src/app/engine/interfaces/filter";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Training } from "src/app/interfaces/training";
import { FilterService } from "src/app/engine/classes/filter-service/filter.service";

@Injectable({
  providedIn: "root"
})
export class TrainingService extends FilterService<Training> {
  constructor(afs: AngularFirestore) {
    super(afs, "trainings");
  }
}
