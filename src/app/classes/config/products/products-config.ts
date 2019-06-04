import { PostFormConfig } from "src/app/interfaces/configs/post-form-config";
import { TableConfig } from "src/app/interfaces/configs/table-config";
import { ProductService } from "src/app/services/product/product.service";
import { Group } from "src/app/engine/interfaces/group";
import { Field } from "src/app/engine/interfaces/field";

export class ProductsConfig {
  constructor(private productService: ProductService) {}
  getPostFormConfig(): PostFormConfig {
    let productTypes: Array<Field> = [];

    this.productService.getProductTypes().subscribe(data => {
      for (const element of data) {
        productTypes.push({
          fieldType: "checkbox",
          title: element.title,
          dbFieldName: "type"
        });
      }
    });

    let titleGroup: Group = {
      title: "Наименование",
      fields: [{ fieldType: "input", inputPlaceHolder: "Наименование", inputType: "text", dbFieldName: "title" }]
    };

    let typeGroup: Group = {
      title: "Типы",
      fields: productTypes
    };

    let priceAndCurrency: Group = {
      title: "Цена и валюта",
      fields: []
    };
    let imageAndReference: Group = {
      title: "Изображение и страница сайта",
      fields: []
    };
    let userAndFirm: Group = {
      title: "Владелец и фирма",
      fields: []
    };

    //TODO: Add post function

    let config: PostFormConfig = {
      collectionName: "Продукты",
      groups: [titleGroup, typeGroup, priceAndCurrency, imageAndReference, userAndFirm],
      onPost: data => {}
    };
    return config;
  }

  getTableConfig(): TableConfig {
    let config: TableConfig = {
      displayColumns: ["title", "price", "currency", "description", "firm", "image", "type"],
      showAll: this.productService.getProductsFromServer.bind(this.productService)
    };
    return config;
  }
}
