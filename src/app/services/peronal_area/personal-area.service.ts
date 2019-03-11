import { Injectable } from "@angular/core";
import { Personal_Area } from "../../interfaces/peronal_area";

@Injectable({
  providedIn: "root"
})
export class PersonalAreaService {
  area: Array<Personal_Area> = [];
  constructor() {
    this.area.push({
      title: "Психолог. Консультация, психологическая помощь.",
      image:
        "http://www.e-event.kz/wp-content/uploads/2017/03/16996003_1367484669984147_4774523484823776271_n.jpg"
    });
    this.area.push({
      title: "Психолог. Консультация, психологическая помощь.",
      image:
        "http://www.e-event.kz/wp-content/uploads/2017/03/16996003_1367484669984147_4774523484823776271_n.jpg"
    });
    this.area.push({
      title: "Психолог. Консультация, психологическая помощь.",
      image:
        "http://www.e-event.kz/wp-content/uploads/2017/03/16996003_1367484669984147_4774523484823776271_n.jpg"
    });
    this.area.push({
      title: "Психолог. Консультация, психологическая помощь.",
      image:
        "http://www.e-event.kz/wp-content/uploads/2017/03/16996003_1367484669984147_4774523484823776271_n.jpg"
    });
  }
  getArea(): Array<Personal_Area> {
    return this.area;
  }
}
