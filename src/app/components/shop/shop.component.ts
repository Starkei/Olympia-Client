import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/interfaces/product";
import { ProductService } from "src/app/services/product/product.service";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"]
})
export class ShopComponent implements OnInit {
  products: Array<Product> = [];
  fxFlex: number = 30;
  constructor(
    private productService: ProductService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.products = productService.getProducts();
  }

  getFormatingPrice(index: number): string {
    return `Цена: ${this.products[index].price}$`;
  }

  getFlex(): string {
    return this.fxFlex + "%";
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(["(max-width: 640px)"])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.fxFlex = 100;
        }
      });

    this.breakpointObserver
      .observe(["(max-width: 870px)"])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.fxFlex = 44;
        } else this.fxFlex = 30;
      });
  }
}
