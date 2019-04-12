import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ProductService } from "src/app/services/product/product.service";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Filter } from "src/app/engine/interfaces/filter";
import { ShopFilter } from "src/app/classes/shop-filter/shop-filter";
import { FilterComponent } from "../../shared/filter-component/filter/filter.component";
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { AdwareComponent } from "../../shared/adware/adware.component";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"]
})
export class ShopComponent implements OnInit, OnDestroy {
  @ViewChild(FilterComponent) filterComponent: FilterComponent;
  filter: Filter;
  fxFlex: number = 30;
  constructor(
    public productService: ProductService,
    private breakpointObserver: BreakpointObserver,
    private ref: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.filter = new ShopFilter(this.productService);
  }

  getFlex(): string {
    return this.fxFlex + "%";
  }

  ngOnInit() {
    this.breakpointObserver.observe(["(max-width: 640px)"]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.fxFlex = 100;
      }
    });

    this.breakpointObserver.observe(["(max-width: 870px)"]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.fxFlex = 44;
      } else this.fxFlex = 30;
    });

    setTimeout(() => {
      let dialogRef: MatDialogRef<AdwareComponent> = this.ref.open(AdwareComponent);
      dialogRef.afterClosed().subscribe(
        (data: any): void => {
          if (!data) data = "Преравано";
          this.snackBar.open(data, "Ок", { duration: 2000 });
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.filter = null;
    this.productService.ngOnDestroy();
  }
}
