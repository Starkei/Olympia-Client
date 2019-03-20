import { Component, OnInit } from "@angular/core";
import { Output } from "src/app/interfaces/output";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import * as _ from "lodash";

@Component({
  selector: "app-output-details",
  templateUrl: "./output-details.component.html",
  styleUrls: ["./output-details.component.scss"]
})
export class OutputDetailsComponent implements OnInit {
  output: Output;
  adware: Array<Output>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.route.paramMap.subscribe(
      (data: ParamMap): void => {
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
      .valueChanges()
      .subscribe(
        (data: Array<Output>): void => {
          data = _.filter(data, value => value.title != this.output.title);
          this.adware = data;
        }
      );
  }

  ngOnInit() {}
}
