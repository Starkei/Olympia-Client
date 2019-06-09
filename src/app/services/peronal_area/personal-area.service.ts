import { Injectable } from "@angular/core";
import { Personal_Area } from "../../interfaces/peronal_area";
import { Event } from "src/app/interfaces/models/event";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { User } from "src/app/interfaces/auth";
import { DataQueryService } from "src/app/engine/classes/data-query-service/data-query.service";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class PersonalAreaService {}
