import { Output } from "src/app/interfaces/output";

export class Training implements Output {
  constructor(
    public title: string,
    public description: string,
    public imagePath: string,
    public moreInfo: string,
    public price: number,
    public leader: string,
    public currency: string
  ) {}

  public getFormattedPrice(): string {
    return `Цена ${this.price}${this.currency}`;
  }
}
