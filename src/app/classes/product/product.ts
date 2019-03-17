import { Output } from "src/app/interfaces/output";

export class Product implements Output {
  public title: string;
  public description: string;
  public image: string;
  public moreInfo: string;
  public price: number;
  public currency: string;
  public firm: string;
  public type: string;

  constructor(product: Product) {
    this.title = product.title;
    this.description = product.description;
    this.image = product.image;
    this.moreInfo = product.moreInfo;
    this.currency = product.currency;
    this.price = product.price;
    this.firm = product.firm;
    this.type = product.type;
  }

  public getFormattedPrice(): string {
    return `Цена: ${this.price} ${this.currency}`;
  }
}
