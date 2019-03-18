import { Injectable } from "@angular/core";
import { Product } from "src/app/classes/product/product";
import { Filterable } from "src/app/interfaces/filterable";
import { Filter } from "src/app/interfaces/filter";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import * as _ from "lodash";
import { map, filter } from "rxjs/operators";
import { Field } from "src/app/interfaces/field";
@Injectable({
  providedIn: "root"
})
export class ProductService implements Filterable {
  filterParametrs = {};
  searchParametrs = {};

  getFilteredData(filter: Filter): Observable<Array<Product>> {
    this.configureFilter(filter);
    return this.afs
      .collection<Product>("products")
      .valueChanges()
      .pipe(
        map(
          (products: Array<Product>): Array<Product> => {
            return this.applyFilters(products);
          }
        )
      )
      .pipe(
        map(
          (products: Array<Product>): Array<Product> => {
            return products.map(
              (product: Product): Product => {
                return new Product(product);
              }
            );
          }
        )
      );
  }

  private configureSearch(filter: Filter): void {
    if (filter.categories[0].fields[0].innerText)
      this.searchParametrs["title"] = (val: string): boolean =>
        val
          .toUpperCase()
          .indexOf(filter.categories[0].fields[0].innerText.toUpperCase()) >= 0;
    else {
      delete this.searchParametrs["title"];
    }
  }

  private configurePrice(filter: Filter): void {
    let from: number = Number.parseInt(
      filter.categories[1].fields[0].innerText
    );
    let to: number = Number.parseInt(filter.categories[1].fields[1].innerText);
    if (from)
      this.filterParametrs["price"] = (val: number): boolean => val >= from;
    if (to) this.filterParametrs["price"] = (val: number): boolean => val <= to;
    if (from && to)
      this.filterParametrs["price"] = (val: number): boolean =>
        val >= from && val <= to;
    if (!from && !to) {
      delete this.filterParametrs["price"];
    }
  }

  private configureType(filter: Filter): void {
    let types: Array<string> = [];
    filter.categories[2].fields.forEach(
      (field: Field): void => {
        if (field.checked) types.push(field.title);
      }
    );
    if (types.length != 0)
      this.filterParametrs["type"] = (val: string): boolean =>
        types.includes(val);
    else {
      delete this.filterParametrs["type"];
    }
  }

  private configureFirm(filter: Filter): void {
    let firms: Array<string> = [];
    filter.categories[3].fields.forEach(
      (field: Field): void => {
        if (field.checked) firms.push(field.title);
      }
    );
    if (firms.length != 0)
      this.filterParametrs["firm"] = (val: string): boolean =>
        firms.includes(val);
    else {
      delete this.filterParametrs["firm"];
    }
  }

  private configureFilter(filter: Filter): void {
    this.configureSearch(filter);
    this.configurePrice(filter);
    this.configureType(filter);
    this.configureFirm(filter);
  }

  applyFilters(products: Array<Product>): Array<Product> {
    let filtered: Array<Product> = _.filter(
      products,
      _.conforms(this.filterParametrs)
    );
    filtered = _.filter(filtered, _.conforms(this.searchParametrs));
    return filtered;
  }

  constructor(private afs: AngularFirestore) {}
}
