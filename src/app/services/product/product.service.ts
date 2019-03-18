import { Injectable } from "@angular/core";
import { Product } from "src/app/classes/product/product";
import { Filterable } from "src/app/interfaces/filterable";
import { Filter } from "src/app/interfaces/filter";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import * as _ from "lodash";
import { map, filter } from "rxjs/operators";
import { Field } from "src/app/interfaces/field";
import { Category } from "src/app/interfaces/category";
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

  public getAllProducts(): Observable<Array<Product>> {
    return this.afs.collection<Product>("products").valueChanges();
  }

  private configureSearch(categories: Array<Category>): void {
    if (categories[0].fields[0].innerText)
      this.searchParametrs["title"] = (val: string): boolean =>
        val
          .toUpperCase()
          .indexOf(categories[0].fields[0].innerText.toUpperCase()) >= 0;
    else {
      delete this.searchParametrs["title"];
    }
  }

  private configurePrice(categories: Array<Category>): void {
    let from: number = Number.parseInt(categories[1].fields[0].innerText);
    let to: number = Number.parseInt(categories[1].fields[1].innerText);
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

  private configureType(categories: Array<Category>): void {
    let types: Array<string> = [];
    categories[2].fields.forEach(
      (field: Field): void => {
        if (field.checked) types.push(field.title);
      }
    );
    if (types.length != 0)
      this.filterParametrs["type"] = (val: Array<string>): boolean =>
        types.filter(value => val.includes(value)).length != 0;
    else {
      delete this.filterParametrs["type"];
    }
  }

  private configureFirm(categories: Array<Category>): void {
    let firms: Array<string> = [];
    categories[3].fields.forEach(
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
    if (!filter.categories) return;
    filter.categories.subscribe(
      (categories: Array<Category>): void => {
        if (categories.length == 0) return;
        this.configureSearch(categories);
        this.configurePrice(categories);
        this.configureType(categories);
        this.configureFirm(categories);
      }
    );
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
