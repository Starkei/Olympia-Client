import { Filter } from "src/app/interfaces/filter";
import { Category } from "src/app/interfaces/category";
import { of, Observable } from "rxjs";
import { ProductService } from "src/app/services/product/product.service";
import { Product } from "../product/product";
import { Field } from "src/app/interfaces/field";

export class ShopFilter implements Filter {
  categories: Observable<Array<Category>>;
  constructor(private service: ProductService) {
    this.service.getAllProducts().subscribe(
      (data: Array<Product>): void => {
        let categories: Array<Category> = [];
        categories.push({
          fields: [
            { fieldType: "input", inputPlaceHolder: "Поиск", inputType: "text" }
          ],
          title: "Поиск"
        });

        categories.push({
          fields: [
            { fieldType: "input", inputPlaceHolder: "от", inputType: "number" },
            { fieldType: "input", inputPlaceHolder: "до", inputType: "number" }
          ],
          title: "Цена"
        });

        categories.push({
          fields: this.createAllTypesFields(data),
          title: "Тип"
        });

        categories.push({
          fields: this.createAllFirmsFields(data),
          title: "Фирма"
        });

        this.categories = of(categories);
      }
    );
  }

  createAllTypesFields(products: Array<Product>): Array<Field> {
    let titles: Array<string> = this.getAllTypes(products);
    return this.addCheckBoxFields(titles);
  }

  createAllFirmsFields(products: Array<Product>): Array<Field> {
    let titles: Array<string> = this.getAllFirms(products);
    return this.addCheckBoxFields(titles);
  }

  getAllTypes(products: Array<Product>): Array<string> {
    let types: Set<string> = new Set();
    products.forEach(
      (product: Product): void => {
        product.type.forEach(
          (type: string): void => {
            types.add(type);
          }
        );
      }
    );

    return Array.from(types);
  }

  getAllFirms(products: Array<Product>): Array<string> {
    let firms: Set<string> = new Set();
    products.forEach(
      (product: Product): void => {
        firms.add(product.firm);
      }
    );
    return Array.from(firms);
  }

  addCheckBoxFields(titles: Array<string>): Array<Field> {
    let fields: Array<Field> = [];
    titles.forEach(
      (element: string): void => {
        fields.push({
          fieldType: "checkbox",
          checked: false,
          title: element
        });
      }
    );
    return fields;
  }
}
