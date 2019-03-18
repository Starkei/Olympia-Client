import { Category } from "./category";
import { Observable } from "rxjs";

export interface Filter {
  categories: Observable<Array<Category>>;
}
