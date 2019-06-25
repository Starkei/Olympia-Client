import { Injectable } from "@angular/core";
import { CardEat } from "src/app/interfaces/CardEat";

@Injectable({
  providedIn: "root"
})
export class CardEatService {
  image: Array<CardEat> = [];

  constructor() {
    this.image.push({
      Group: "Работники преимущественно умственного труда",
      Proteins: 75,
      Fats: 84,
      Carbohydrates: 310,
      Energy: 9.6,
      image: "https://image.flaticon.com/icons/svg/843/843293.svg"
    });
    this.image.push({
      Group: "Работники занятые лёгким физическим трудом",
      Proteins: 74,
      Fats: 90,
      Carbohydrates: 337,
      Energy: 10.3,
      image: "https://image.flaticon.com/icons/svg/409/409747.svg"
    });
    this.image.push({
      Group: " Работники среднего по тяжести труда",
      Proteins: 78,
      Fats: 95,
      Carbohydrates: 358,
      Energy: 10.9,
      image: "https://image.flaticon.com/icons/svg/409/409683.svg"
    });
    this.image.push({
      Group: "Работники тяжелого физического труда",
      Proteins: 84,
      Fats: 112,
      Carbohydrates: 427,
      Energy: 12.8,
      image: "https://image.flaticon.com/icons/svg/813/813966.svg"
    });
    this.image.push({
      Group: "Работники занятые особо тяжёлым физическим трудом",
      Proteins: 92,
      Fats: 121,
      Carbohydrates: 469,
      Energy: 14.2,
      image: "https://image.flaticon.com/icons/svg/307/307894.svg"
    });
  }

  getImage(): Array<CardEat> {
    return this.image;
  }
}
