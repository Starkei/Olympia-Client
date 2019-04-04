import { Component, OnInit } from "@angular/core";
import { Creator } from "src/app/engine/classes/creator/creator";
import { ProductService } from "src/app/services/product/product.service";
import { Product } from "src/app/interfaces/models/product";
import { FormGroup, FormControl, FormControlName, Validators } from "@angular/forms";

@Component({
  selector: "app-product-creator",
  templateUrl: "./product-creator.component.html",
  styleUrls: ["./product-creator.component.scss"]
})
export class ProductCreatorComponent extends Creator<Product> implements OnInit {
  productCreationForm: FormGroup;

  constructor(public productService: ProductService) {
    super(productService);

    this.productCreationForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(1)]),
      price: new FormControl("", [Validators.min(0)]),
      description: new FormControl(""),
      firm: new FormControl("", [Validators.required, Validators.minLength(1)])
    });
  }

  ngOnInit() {}
}
