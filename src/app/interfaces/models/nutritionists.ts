import { Output } from "src/app/interfaces/output";

export interface Nutritionists extends Output {
  id: string;
  title: string;
  description: string;
  image: string;
  profession: string;
}
