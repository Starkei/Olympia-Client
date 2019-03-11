import { Component, OnInit } from "@angular/core";
import { Personal_Area } from "../../interfaces/peronal_area";
import { PersonalAreaService } from "../../services/peronal_area/personal-area.service";

@Component({
  selector: "app-personal-area",
  templateUrl: "./personal-area.component.html",
  styleUrls: ["./personal-area.component.scss"]
})
export class PersonalAreaComponent implements OnInit {
  messages: string[] = ['Message1', 'Message2', 'Message3', 'Message4', 'Message5'];
  area: Array<Personal_Area> = [];
  constructor(private service: PersonalAreaService) {}

  ngOnInit() {
    this.getArea();
  }
  getArea() {
    this.area = this.service.getArea();
  }
}
