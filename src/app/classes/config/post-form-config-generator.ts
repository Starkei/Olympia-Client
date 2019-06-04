import { PostFormConfig } from "src/app/interfaces/configs/post-form-config";
import { ProductsConfig } from "./products/products-config";
import { ProductsTypesConfig } from "./products/products-types-config";
import { ProductService } from "src/app/services/product/product.service";

export class PostFormConfigGenerator {
  constructor(private productConfig: ProductsConfig, private productTypesConfig: ProductsTypesConfig) {}

  getProductsConfig(): PostFormConfig {
    return this.productConfig.getPostFormConfig();
  }

  getProductsTypesConfig(): PostFormConfig {
    return this.productTypesConfig.getPostFormConfig();
  }
}
