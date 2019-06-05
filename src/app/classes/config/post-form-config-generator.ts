import { PostFormConfig } from "src/app/interfaces/configs/post-form-config";
import { ProductsConfig } from "./products/products-config";

export class PostFormConfigGenerator {
  constructor(private productConfig: ProductsConfig) { }

  getProductsConfig(): PostFormConfig {
    return this.productConfig.getPostFormConfig();
  }

}
