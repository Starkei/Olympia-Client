import { Filter } from "src/app/interfaces/filter";
import { Category } from "src/app/interfaces/category";
import { of, Observable } from "rxjs";
import { ProductService } from "src/app/services/product/product.service";
import { Product } from "../../interfaces/models/product";
import { Field } from "src/app/interfaces/field";
import { FilterGenerator } from "../engine/filter-generator/filter-generator";

export class ShopFilter extends FilterGenerator<Product> {
  constructor(private service: ProductService) {
    super();
    this.service.getAllConvertedData<Product>().subscribe(
      (data: Array<Product>): void => {
        let categories: Array<Category> = [];
        categories.push({
          fields: [
            {
              fieldType: "input",
              inputPlaceHolder: "Поиск",
              inputType: "search"
            }
          ],
          title: "Поиск",
          dataFieldName: "title"
        });

        categories.push({
          fields: [
            { fieldType: "input", inputPlaceHolder: "от", inputType: "number" },
            { fieldType: "input", inputPlaceHolder: "до", inputType: "number" }
          ],
          title: "Цена",
          dataFieldName: "price"
        });

        categories.push({
          fields: this.createAllTypesFields(data),
          title: "Тип",
          dataFieldName: "type"
        });

        categories.push({
          fields: this.createAllFirmsFields(data),
          title: "Фирма",
          dataFieldName: "firm"
        });

        this.categories = of(categories);
      }
    );
  }

  createAllTypesFields(products: Array<Product>): Array<Field> {
    let titles: Array<string> = Array.from(
      this.getSetFromArrayPropertiesValues(products, "type")
    );
    return this.generateCheckBoxFields(titles);
  }

  createAllFirmsFields(products: Array<Product>): Array<Field> {
    let titles: Array<string> = Array.from(
      this.getSetOfPropertiesValues(products, "firm")
    );
    return this.generateCheckBoxFields(titles);
  }
}
