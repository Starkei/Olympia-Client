import { Component, OnInit } from "@angular/core";
import { TableConfig } from "src/app/interfaces/configs/table-config";
import { Adware } from "src/app/interfaces/models/adware";
import { AdwareService } from "src/app/services/adware/adware.service";
import { ProductService } from "src/app/services/product/product.service";
import { AuthService } from "src/app/services/auth/Auth.service";
import { Output } from "src/app/interfaces/output";
import { PostFormConfig } from "src/app/interfaces/configs/post-form-config";
import { PostFormConfigGenerator } from "src/app/classes/config/post-form-config-generator";
import { TableConfigGenerator } from "src/app/classes/config/table-config-generator";
import { ConfigGenerator } from "src/app/classes/config/config-generator";

interface Collection {
  name: string;
  tableConfig: TableConfig;
  postFormConfig: PostFormConfig;
}

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.scss"]
})
export class AdminPanelComponent implements OnInit {
  collections: Array<Collection>;
  configGenerator: ConfigGenerator;

  constructor(
    public adwareService: AdwareService,
    public productService: ProductService,
    public userService: AuthService
  ) {
    this.configGenerator = new ConfigGenerator(this.productService);

    this.collections = [
      {
        name: "Типы товаров",
        tableConfig: this.configGenerator.getTableConfigGenerator().getProductsTypesConfig(),
        postFormConfig: this.configGenerator.getPostFormConfigGenerator().getProductsTypesConfig()
      },
      {
        name: "Товары",
        tableConfig: this.configGenerator.getTableConfigGenerator().getProductsConfig(),
        postFormConfig: this.configGenerator.getPostFormConfigGenerator().getProductsConfig()
      }
    ];
  }

  ngOnInit() {}
}
