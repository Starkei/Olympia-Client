import { Output } from "src/app/interfaces/output";
import { Timestamp } from "rxjs/Rx";

export interface News extends Output {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  date?: any;
  reference?: string;
}
