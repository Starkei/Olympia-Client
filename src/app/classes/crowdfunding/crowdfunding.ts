import { Output } from "src/app/interfaces/output";

export class Crowdfunding implements Output {
  constructor(
    public title: string,
    public description: string,
    public moreInfo: string,
    public imagePath: string,
    public price: number,
    public currency: string
  ) {}

  public getFormattedPrice(): string {
    return `Нам нужно ${this.price}${this.currency}`;
  }
}
