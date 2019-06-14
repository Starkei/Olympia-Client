import { Output } from "src/app/interfaces/output";

export interface Training extends Output {
  title: string;
  description: string;
  price: number;
  address: string;
  leader: string;
  image: string;
  currency: string;
}
