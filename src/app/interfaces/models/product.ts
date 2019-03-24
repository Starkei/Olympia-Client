import { Output } from "src/app/interfaces/output";

export class Product implements Output {
  id: string;
  title: string;
  description: string;
  image: string;
  moreInfo: string;
  price: number;
  currency: string;
  firm: string;
  type: Array<string>;
}
