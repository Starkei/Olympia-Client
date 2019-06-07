import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Output } from "src/app/interfaces/output";
import { SelectionModel } from "@angular/cdk/collections";
import { TableConfig } from "src/app/interfaces/configs/table-config";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {
  displayColumns: Array<string>;
  dataSource: MatTableDataSource<Output>;
  selection: SelectionModel<Output>;

  @Input() config: TableConfig;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.config) {
      this.config.showAll().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
      this.displayColumns = ["select", ...this.config.allColumns];
      this.selection = new SelectionModel<Output>(true, []);
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Output): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  deleteAll(): void {
    this.config.onDelete(this.selection.selected);
    this.selection.clear();
  }

  getDataFrom(element: any, fields: Array<string>): any {
    let start: any = element;
    for (const iterator of fields) {
      if (element[iterator])
        element = element[iterator];
    }

    element = this.convertToNormalDate(element);
    element = this.convertArrayOfTimeStamp(element);

    if (start === element)
      element = null;

    return element ? element : "Пусто";
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  private convertArrayOfTimeStamp(elements): any {
    if (elements && typeof elements === "object" && elements.length)
      for (let i = 0; i < elements.length; i++) {
        elements[i] = this.convertToNormalDate(elements[i]);
      }
    return elements;
  }

  private convertToNormalDate(element): any {
    if (element && typeof element === "object" && element.seconds) {
      let options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
      let withoutHours = { year: "numeric", month: "long", day: "2-digit" };
      element = element.toDate();
      if (element.getHours() == "00")
        element = element.toLocaleString("ru-RU", withoutHours);
      else
        element = element.toLocaleString("ru-RU", options);
    }
    return element;
  }

}
