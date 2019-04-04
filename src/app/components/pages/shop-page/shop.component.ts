import { Component, OnInit, ViewChild } from "@angular/core";
import { ProductService } from "src/app/services/product/product.service";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Filter } from "src/app/engine/interfaces/filter";
import { ShopFilter } from "src/app/classes/shop-filter/shop-filter";
import { FilterComponent } from "../../shared/filter-component/filter/filter.component";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"]
})
export class ShopComponent implements OnInit {
  @ViewChild(FilterComponent) filterComponent: FilterComponent;
  filter: Filter;
  fxFlex: number = 30;
  constructor(public productService: ProductService, private breakpointObserver: BreakpointObserver) {
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
  }
}
