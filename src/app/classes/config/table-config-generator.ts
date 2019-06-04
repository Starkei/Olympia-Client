import { ProductsConfig } from "./products/products-config";
import { ProductsTypesConfig } from "./products/products-types-config";
import { TableConfig } from "src/app/interfaces/configs/table-config";
import { Output } from "src/app/interfaces/output";
import { ProductService } from "src/app/services/product/product.service";

export class TableConfigGenerator {
  constructor(private productConfig: ProductsConfig, private productTypesConfig: ProductsTypesConfig) {}

  getProductsConfig(): TableConfig {
    return this.productConfig.getTableConfig();
  }

  getProductsTypesConfig(): TableConfig {
    return this.productTypesConfig.getTableConfig();
  }
}
