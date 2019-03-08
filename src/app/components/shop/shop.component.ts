import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/interfaces/product";
import { ProductService } from "src/app/services/product/product.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"]
})
export class ShopComponent implements OnInit {
  products: Array<Product> = [];

  constructor(private productService: ProductService) {
    this.products = productService.getProducts();
  }

  ngOnInit() {}
}
