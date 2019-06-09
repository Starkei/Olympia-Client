import { Category } from "src/app/interfaces/category";
import { of } from "rxjs";
import { ProductService } from "src/app/services/product/product.service";
import { Product } from "../../interfaces/models/product";
import { Field } from "src/app/engine/interfaces/field";
import { FilterGenerator } from "src/app/engine/classes/filter-generator/filter-generator";

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
            { fieldType: "input", inputPlaceHolder: "от", inputType: "number", minValue: 0 },
            { fieldType: "input", inputPlaceHolder: "до", inputType: "number", minValue: 0 }
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
    let titles: Array<string> = Array.from(this.getSetFromArrayPropertiesValues(products, "type"));
    return this.generateCheckBoxFields(titles);
  }

  createAllFirmsFields(products: Array<Product>): Array<Field> {
    let titles: Array<string> = Array.from(this.getSetOfPropertiesValues(products, "firm"));
    return this.generateCheckBoxFields(titles);
  }
}
