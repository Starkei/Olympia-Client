import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable } from "rxjs";
import { TableConfig } from "src/app/interfaces/configs/table-config";
import { CollectionViewer } from "@angular/cdk/collections";
import { finalize, map } from "rxjs/operators";

export class TableDataSource implements DataSource<any> {
  private dataSubject: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loading: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private config: TableConfig) {}

  connect(collectionViewer: CollectionViewer): Observable<Array<any>> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  loadData(): void {
    this.loadingSubject.next(true);
    this.config
      .showAll()
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(data => this.dataSubject.next(data));
  }
}
