import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Output } from "src/app/interfaces/output";
import { SelectionModel, DataSource } from "@angular/cdk/collections";
import { TableConfig } from "src/app/interfaces/configs/table-config";
import { config } from "rxjs";
import { TableDataSource } from "src/app/classes/datasource/table-datasource";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {
  displayColumns: Array<string>;
  dataSource: TableDataSource;
  selection: SelectionModel<Output>;

  @Input() config: TableConfig;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    if (!config) throw new Error("Config does not exists!");
    this.displayColumns = ["select", ...this.config.displayColumns];
    this.dataSource = new TableDataSource(this.config);
    this.selection = new SelectionModel<Output>(true, []);
    this.dataSource.loadData();
  }

  isAllSelected(): boolean {
    if (!this.dataSource) return false;
    return false;
  }

  masterToggle(): void {
    if (!this.dataSource) return;
    return;
  }

  checkboxLabel(row?: Output): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"}`;
  }

  refresh(): void {
    this.dataSource.loadData();
  }
}
