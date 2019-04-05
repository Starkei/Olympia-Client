import * as _ from "lodash";
import { Observable } from "rxjs";
import { Filter } from "src/app/engine/interfaces/filter";
import { DataQueryService } from "../data-query-service/data-query.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Category } from "src/app/interfaces/category";
import { Filterable } from "src/app/engine/interfaces/filterable";
import { FieldType } from "src/app/engine/enums/field-type.enum";

export class FilterService<T> extends DataQueryService implements Filterable {
  private filterIterator: _.ListIterateeCustom<T, boolean>;
  private filterParams: any = {};
  private priceParams: any = {};
  private searchParams: any = {};

  constructor(afs: AngularFirestore, collection: string) {
    super(afs, collection);
  }

  protected searchFilterConfigure(categories: Array<Category>): void {
    for (const category of categories) {
      if (category.title == "Поиск") {
        if (!category.fields[0].innerText || category.fields[0].innerText.length == 0) {
          delete this.searchParams[category.dataFieldName];
          break;
        }
        let searchStr: string = category.fields[0].innerText.toUpperCase();
        this.searchParams[category.dataFieldName] = (val: string): boolean => val.toUpperCase().indexOf(searchStr) >= 0;
        break;
      }
    }
  }

  protected priceFilterConfigure(categories: Array<Category>): void {
    for (const category of categories) {
      if (category.title == "Цена") {
        let from: number = Number.parseFloat(category.fields[0].innerText);
        let to: number = Number.parseFloat(category.fields[1].innerText);
        if (to && from) this.priceParams[category.dataFieldName] = val => from <= val && val <= to;
        else if (from) this.priceParams[category.dataFieldName] = val => from <= val;
        else if (to) this.priceParams[category.dataFieldName] = val => val <= to;
        else delete this.priceParams[category.dataFieldName];
        return;
      }
    }
  }

  protected filterConfigure(categories: Array<Category>): void {
    let checkbox: Array<string> = [];
    let select: Array<string> = [];
    for (const category of categories) {
      if (category.dataFieldName) {
        let isCheckbox: boolean = false;
        let isSelect: boolean = false;
        let isInput: boolean = false;

        for (const field of category.fields) {
          switch (field.fieldType) {
            case FieldType.checkbox:
              if (field.checked) {
                isCheckbox = true;
                checkbox.push(field.title);
              }
              break;
            case FieldType.select:
              if (field.innerText) {
                isSelect = true;
                select.push(field.innerText);
              }
              break;
            case FieldType.input:
              isInput = true;
            default:
              break;
          }
          if (isCheckbox)
            this.filterParams[category.dataFieldName] = val =>
              checkbox.filter(value => val.includes(value)).length != 0;
          else if (isSelect)
            this.filterParams[category.dataFieldName] = val => select.filter(value => val.includes(value)).length != 0;
          else if (!isInput) delete this.filterParams[category.dataFieldName];
        }
      }
    }
  }

  protected configure(): void {
    this.filterIterator = value => {
      let fieldExist: boolean = false;
      let search: boolean = true;
      let filter: boolean = true;
      let price: boolean = true;
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          const element = value[key];
          if (this.searchParams.hasOwnProperty(key)) {
            fieldExist = true;
            search = this.searchParams[key](element);
          }
          if (this.filterParams.hasOwnProperty(key)) {
            fieldExist = true;
            filter = this.filterParams[key](element);
          }
          if (this.priceParams.hasOwnProperty(key)) {
            fieldExist = true;
            price = this.priceParams[key](element);
          }
        }
      }
      if (fieldExist && filter && search && price) return true;
      return !fieldExist;
    };
  }

  protected applyFilters(filter: Filter): void {
    if (!filter || !filter.categories) return;
    filter.categories.subscribe(
      (categories: Array<Category>): void => {
        if (categories.length == 0) return;
        this.searchFilterConfigure(categories);
        this.priceFilterConfigure(categories);
        this.filterConfigure(categories);
        this.configure();
      }
    );
  }

  public getFilteredData(filter: Filter): Observable<Array<T>> {
    this.applyFilters(filter);
    return this.getAllConvertedData<T>().pipe(
      map(
        (convertedData: Array<T>): Array<T> => {
          let data: Array<T> = _.filter<T>(convertedData, this.filterIterator);
          return data;
        }
      )
    );
  }
}
