import { Filter } from "./filter";
import { Observable } from "rxjs";
import { Output } from "../../interfaces/output";

export interface Filterable {
  getFilteredData(filter: Filter): Observable<Array<Output>>;
}
