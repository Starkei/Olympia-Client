import { Component, OnInit, Input } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "src/app/interfaces/auth";
import { PersonalAreaService } from "src/app/services/peronal_area/personal-area.service";

@Component({
  selector: "app-info-event",
  templateUrl: "./info-event.component.html",
  styleUrls: ["./info-event.component.scss"]
})
export class InfoEventComponent implements OnInit {
  items = this.service.event;
  heroes$: Observable<any>;
  event: Observable<any>;
  constructor(route: ActivatedRoute, private service: PersonalAreaService) {
    console.log(this.items);
  }

  ngOnInit() {}
}
