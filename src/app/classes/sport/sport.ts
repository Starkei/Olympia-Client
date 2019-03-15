import { Output } from "src/app/interfaces/output";

export class Sport implements Output {
  constructor(
    public title: string,
    public description: string,
    public imagePath: string,
    public moreInfo: string,
    public price: number
  ) {}

  getFormattedPrice(): string {
    return `${this.price}`;
  }
}
