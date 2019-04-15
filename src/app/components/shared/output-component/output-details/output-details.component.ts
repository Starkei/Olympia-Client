import { Component, OnInit } from "@angular/core";
import { Output } from "src/app/interfaces/output";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import * as _ from "lodash";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-output-details",
  templateUrl: "./output-details.component.html",
  styleUrls: ["./output-details.component.scss"]
})
export class OutputDetailsComponent implements OnInit {
  output: Output;
  adware: Observable<Array<Output>>;
  collection: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.route.paramMap.subscribe(
      (data: ParamMap): void => {
        this.collection = data.get("collection");
        this.afs
          .collection<Output>(data.get("collection"))
          .doc(data.get("uid"))
          .valueChanges()
          .subscribe(
            (d: Output): void => {
              this.output = d;
              this.getFirstFive(data.get("collection"));
            }
          );
      }
    );
  }

  getFirstFive(collection: string): void {
    this.afs
      .collection<Output>(collection, ref => {
        return ref.where("type", "==", this.output.type).limit(5);
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          actions = actions.filter(
            val => val.payload.doc.data().title != this.output.title
          );
          return actions.map(action => {
            let data = action.payload.doc.data();
            let id = action.payload.doc.id;
            data.id = id;
            return { id, ...data } as Output;
          });
        })
      )
      .pipe(data => (this.adware = data));
  }

  public convertSecondsToHours(seconds: number): string {
    let h: number = seconds / 3600;
    let m: number = (seconds % 3600) / 60;
    let hours: string = h > 0 ? (h < 10 ? "0" + h : h + "") : "00";
    let minutes: string = m > 0 ? (m < 10 ? "0" + m : m + "") : "00";
    return hours + ":" + minutes;
  }

  getLink(url: string): string {
    return "http://" + url;
  }

  follow(item: Output): void {
    console.log(item);
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: this.collection }
    ]);
  }

  ngOnInit() {}
}
