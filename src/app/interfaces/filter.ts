import { Category } from "./category";
import { Observable } from "rxjs";

/**
 * @description Хранит стостояния фильтра
 * @param categories Хранит состояния каждой категории
 * @export
 * @interface Filter
 */
export interface Filter {
  categories: Observable<Array<Category>>;
}
