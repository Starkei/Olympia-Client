import { Output } from "src/app/interfaces/output";

export interface Sport extends Output {
  id: string;
  title: string;
  description: string;
  image: string;
  address: string;
  contraindications: Array<string>;
  phoneNumbers: Array<string>;
  underground: string;
  reference: string;
  type: Array<string>;
}
