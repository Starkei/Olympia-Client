import { DataQueryService } from "../data-query-service/data-query.service";

export class Creator<T> {
  constructor(private service: DataQueryService) {}

  protected create(element: T): void {
    this.service.addDocument<T>(element);
  }
}
