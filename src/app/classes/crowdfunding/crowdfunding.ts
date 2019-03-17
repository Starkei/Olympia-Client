import { Output } from "src/app/interfaces/output";

export class Crowdfunding implements Output {
  public title: string;
  public description: string;
  public moreInfo: string;
  public image: string;
  public price: number;
  public currency: string;

  constructor(object: Crowdfunding) {
    this.title = object.title;
    this.description = object.description;
    this.moreInfo = object.moreInfo;
    this.image = object.image;
    this.price = object.price;
    this.currency = object.currency;
  }

  public getFormattedPrice(): string {
    return `Нам нужно ${this.price}${this.currency}`;
  }
}
