import { Output } from "../output";

export interface Crowdfunding extends Output {
  id: string;
  title?: string;
  description?: string;
  moreInfo?: string;
  image?: string;
  price?: number;
  currency?: string;
  type?: Array<string>;
  usage?: Array<string>;
  formattedPrice?: string;
}
