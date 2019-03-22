import { Injectable } from "@angular/core";
import { Training } from "src/app/classes/training/training";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  items: Observable<any[]>;
  constructor(public db: AngularFirestore) {
    this.items = this.db.collection("trainings").valueChanges();
  }
  // getFire(): Observable<any[]> {
  //   return ();
  // }
}
