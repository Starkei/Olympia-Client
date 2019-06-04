import { PostFormConfig } from "src/app/interfaces/configs/post-form-config";
import { Group } from "src/app/engine/interfaces/group";
import { TableConfig } from "src/app/interfaces/configs/table-config";
import { ProductService } from "src/app/services/product/product.service";

export class ProductsTypesConfig {
  constructor(private productService: ProductService) {}

  getPostFormConfig(): PostFormConfig {
    let title: Group = {
      title: "Наименование",
      fields: [{ fieldType: "input", inputPlaceHolder: "Наименование", inputType: "text", dbFieldName: "title" }]
    };

    let config: PostFormConfig = {
      collectionName: "Типы продуктов",
      groups: [title],
      onPost: this.productService.postProductType.bind(this.productService)
    };
    return config;
  }

  getTableConfig(): TableConfig {
    let config: TableConfig = {
      displayColumns: ["title"],
      showAll: this.productService.getProductTypes.bind(this.productService)
    };
    return config;
  }
}
