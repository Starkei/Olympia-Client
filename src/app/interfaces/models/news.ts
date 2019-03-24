import { Output } from "src/app/interfaces/output";

export interface News extends Output {
  id: string;
  title: string;
  description: string;
  image: string;
}
