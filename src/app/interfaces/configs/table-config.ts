import { FilterService } from "src/app/engine/classes/filter-service/filter.service";
import { Observable } from "rxjs";
import { Output } from "../output";
import { ProductService } from "src/app/services/product/product.service";

export interface TableConfig {
  displayColumns: Array<string>;
  titles: Array<string>;
  allColumns: Array<string>;
  showAll: () => Observable<Array<Output>>;
  onDelete?: (selected: Array<Output>) => void;
  onChange?: (output: Output) => void;
}
