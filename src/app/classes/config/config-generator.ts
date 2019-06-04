import { ProductService } from "src/app/services/product/product.service";
import { ProductsConfig } from "./products/products-config";
import { ProductsTypesConfig } from "./products/products-types-config";
import { PostFormConfigGenerator } from "./post-form-config-generator";
import { TableConfigGenerator } from "./table-config-generator";

export class ConfigGenerator {
  productConfig: ProductsConfig;
  productTypesConfig: ProductsTypesConfig;

  postFormConfigGenerator: PostFormConfigGenerator;
  tableConfigGenerator: TableConfigGenerator;

  constructor(productService: ProductService) {
    this.productConfig = new ProductsConfig(productService);
    this.productTypesConfig = new ProductsTypesConfig(productService);

    this.postFormConfigGenerator = new PostFormConfigGenerator(this.productConfig, this.productTypesConfig);
    this.tableConfigGenerator = new TableConfigGenerator(this.productConfig, this.productTypesConfig);
  }

  getPostFormConfigGenerator(): PostFormConfigGenerator {
    return this.postFormConfigGenerator;
  }

  getTableConfigGenerator(): TableConfigGenerator {
    return this.tableConfigGenerator;
  }
}
