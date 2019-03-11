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
      Proteins: 99,
      Fats: 96,
      Carbohydrates: 96,
      Energy: 11.3,
      image: "https://image.flaticon.com/icons/svg/843/843293.svg"
    });
    this.image.push({
      Group: "Работники занятые лёгким физическим трудом",
      Proteins: 98,
      Fats: 108,
      Carbohydrates: 400,
      Energy: 12.3,
      image: "https://image.flaticon.com/icons/svg/409/409747.svg"
    });
    this.image.push({
      Group: " Работники среднего по тяжести труда",
      Proteins: 93,
      Fats: 114,
      Carbohydrates: 426,
      Energy: 13,
      image: "https://image.flaticon.com/icons/svg/409/409683.svg"
    });
    this.image.push({
      Group: "Работники тяжелого физического труда",
      Proteins: 99,
      Fats: 132,
      Carbohydrates: 504,
      Energy: 15.1,
      image: "https://image.flaticon.com/icons/svg/813/813966.svg"
    });
    this.image.push({
      Group: "Работники занятые особо тяжёлым физическим трудом",
      Proteins: 113,
      Fats: 150,
      Carbohydrates: 574,
      Energy: 17.2,
      image: "https://image.flaticon.com/icons/svg/307/307894.svg"
    });
  }

  getImage(): Array<CardEat> {
    return this.image;
  }
}
