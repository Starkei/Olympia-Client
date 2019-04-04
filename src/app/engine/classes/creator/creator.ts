import { DataQueryService } from "../data-query-service/data-query.service";
import { FilterGenerator } from "../filter-generator/filter-generator";

export class Creator<T> extends FilterGenerator<T> {
  constructor(private service: DataQueryService) {
    super();
  }

  protected create(element: T): void {
    this.service.addDocument<T>(element);
  }
}
