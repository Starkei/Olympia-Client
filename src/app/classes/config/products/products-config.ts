import { PostFormConfig } from "src/app/interfaces/configs/post-form-config";
import { TableConfig } from "src/app/interfaces/configs/table-config";
import { ProductService } from "src/app/services/product/product.service";
import { Group } from "src/app/engine/interfaces/group";
import { Field } from "src/app/engine/interfaces/field";
import { Output } from '@angular/compiler/src/core';
import { FieldType } from 'src/app/engine/enums/field-type.enum';

export class ProductsConfig {
  constructor(private productService: ProductService) { }
  getPostFormConfig(): PostFormConfig {

    let inputForCreateType: Field = { fieldType: FieldType.input, inputType: "text", inputPlaceHolder: "Введите наименование типа" };
    let buttonForCreateType: Field = {
      fieldType: FieldType.button, title: "add", buttonType: "icon", onClick: () => {
        productTypes.push({ fieldType: "checkbox", title: inputForCreateType.innerText, dbFieldName: ["type"] })
        inputForCreateType.innerText = "";
      }
    };

    let productTypes: Array<Field> = [

    ];

    this.productService.getAllConvertedData().subscribe(data => {
      let types: Array<string> = this.getAllProductTypes(data);
      for (const element of types) {
        productTypes.push({
          fieldType: "checkbox",
          title: element,
          dbFieldName: ["type"]
        });
      }
    });

    let titleGroup: Group = {
      title: "Наименование",
      fields: [
        {
          fieldType: "input",
          inputPlaceHolder: "Наименование",
          inputType: "text",
          dbFieldName: ["title"],
          required: true
        }
      ]
    };

    let typeCreation: Group = {
      title: "Добавление нового типа",
      fields: [
        inputForCreateType,
        buttonForCreateType
      ]
    }

    let typeGroup: Group = {
      title: "Типы",
      fields: productTypes
    };

    let priceAndCurrency: Group = {
      title: "Цена и валюта",
      fields: [
        {
          fieldType: FieldType.input,
          inputPlaceHolder: "Цена",
          inputType: "number",
          minValue: 0,
          required: true,
          dbFieldName: ["price"]
        },
        {
          fieldType: FieldType.select,
          selectItems: ["бел.руб", "y.e"],
          inputPlaceHolder: "Валюта",
          required: true,
          dbFieldName: ["currency"]
        }
      ]
    };
    let imageAndReference: Group = {
      title: "Изображение и страница сайта",
      fields: [
        {
          fieldType: FieldType.input,
          inputType: "text",
          inputPlaceHolder: "Адрес сайта",
          dbFieldName: ["address"]
        },
        {
          fieldType: FieldType.button,
          buttonType: "file",
          dbFieldName: ["image"],
          pathToImages: "productsImages/"
        },
      ]
    };
    let userAndFirm: Group = {
      title: "Владелец и фирма",
      fields: [
        {
          fieldType: FieldType.input,
          inputType: "email",
          inputPlaceHolder: "Електронный адрес владельца",
          required: true,
          dbFieldName: ["owner"]
        },
        {
          fieldType: FieldType.input,
          inputType: "text",
          inputPlaceHolder: "Фирма",
          dbFieldName: ["firm"]
        },
      ]
    };

    let descriptionGroup: Group = {
      title: "Описание",
      fields: [
        {
          fieldType: FieldType.textarea,
          inputPlaceHolder: "Описание",
          dbFieldName: ["description"]
        },
      ]
    }

    let config: PostFormConfig = {
      collectionName: "Продукты",
      groups: [titleGroup, typeCreation, typeGroup, priceAndCurrency, imageAndReference, userAndFirm, descriptionGroup],
      onPost: this.productService.addDocument.bind(this.productService)
    };
    return config;
  }

  getTableConfig(): TableConfig {
    let config: TableConfig = {
      displayColumns: ["title", "price", "currency", "description", "firm", "image", "type", "owner"],
      titles: ["Наименование", "Цена", "Валюта", "Описание", "Фирма", "Изображение", "Тип", "Владелец"],
      allColumns: ["title", "price", "currency", "description", "firm", "image", "type", "owner"],
      showAll: this.productService.getAllConvertedData.bind(this.productService),
      onDelete: this.productService.deleteDocuments.bind(this.productService)
    };
    return config;
  }

  private getAllProductTypes(collection: Array<Output>): Array<string> {
    let values: Set<string> = new Set();

    for (const element of collection) {
      for (const item of element["type"]) {
        values.add(item);
      }
    }

    return Array.from(values);
  }
}
