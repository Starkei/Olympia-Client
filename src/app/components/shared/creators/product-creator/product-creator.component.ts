import { Component, OnInit } from "@angular/core";
import { Creator } from "src/app/engine/classes/creator/creator";
import { ProductService } from "src/app/services/product/product.service";
import { Product } from "src/app/interfaces/models/product";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { UploaderService } from "src/app/services/uploader-service/uploader.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-product-creator",
  templateUrl: "./product-creator.component.html",
  styleUrls: ["./product-creator.component.scss"]
})
export class ProductCreatorComponent extends Creator<Product> implements OnInit {
  public product: Product;
  public file: File;
  public productTypes: string[];

  productCreationForm: FormGroup;

  constructor(
    public productService: ProductService,
    public upload: UploaderService,
    public ref: MatDialogRef<ProductCreatorComponent>
  ) {
    super(productService);

    this.productCreationForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(3)]),
      price: new FormControl("", [Validators.min(0)]),
      description: new FormControl(""),
      firm: new FormControl("", [Validators.required, Validators.minLength(3)])
    });

    this.productService.getAllConvertedData<Product>().subscribe(
      (data: Array<Product>): void => {
        this.productTypes = Array.from(this.getSetFromArrayPropertiesValues(data, "type"));
      }
    );
  }

  public async add() {
    this.product = this.productCreationForm.value as Product;
    let url: string = await this.upload.uploadFile(this.file);
    this.product.image = url;
    this.create(this.product);
    this.close("Добавлено");
  }

  public close(message: string = "Закрыто"): void {
    this.ref.close(message);
  }

  public setFile(files: FileList): void {
    this.file = files.item(0);
  }

  ngOnInit() {}
}
