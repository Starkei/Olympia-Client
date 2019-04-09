import { Output } from "src/app/interfaces/output";

export interface Event extends Output {
  id: string;
  title: string;
  description: string;
  address: string;
  image: string;
  phoneNumbers: Array<string>;
  time: Array<string>;
  details: Array<string>;
}
