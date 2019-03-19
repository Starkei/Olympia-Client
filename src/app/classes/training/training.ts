import { Output } from "src/app/interfaces/output";

export class Training implements Output {
  public title: string;
  public description: string;
  public image: string;
  public moreInfo: string;
  public price: number;
  public leader: string;
  public currency: string;
  constructor(training: Training) {
    this.title = training.title;
    this.description = training.description;
    this.image = training.image;
    this.moreInfo = training.moreInfo;
    this.price = training.price;
    this.leader = training.leader;
    this.currency = training.currency;
  }

  public getFormattedPrice(): string {
    return `Цена ${this.price}${this.currency}`;
  }
}
