import * as _ from "lodash";
import { Observable, Subscription } from "rxjs";
import { Filter } from "src/app/engine/interfaces/filter";
import { DataQueryService } from "../data-query-service/data-query.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Category } from "src/app/interfaces/category";
import { Filterable } from "src/app/engine/interfaces/filterable";
import { FieldType } from "src/app/engine/enums/field-type.enum";
import { OnDestroy } from "@angular/core";

/**
 *
 * @description You should execute method ngOnDestroy for reset filters params
 * @export
 * @class FilterService
 * @extends {DataQueryService}
 * @implements {Filterable}
 * @implements {OnDestroy}
 * @template T
 */
export class FilterService<T> extends DataQueryService
  implements Filterable, OnDestroy {
  private filterIterator: _.ListIterateeCustom<T, boolean>;
  private filterParams: any = {};
  private priceParams: any = {};
  private searchParams: any = {};
  private subscription: Subscription;

  constructor(afs: AngularFirestore, collection: string) {
    super(afs, collection);
  }

  protected searchFilterConfigure(categories: Array<Category>): void {
    for (const category of categories) {
      if (category.title == "Поиск") {
        if (
          !category.fields[0].innerText ||
          category.fields[0].innerText.length == 0
        ) {
          delete this.searchParams[category.dataFieldName];
          break;
        }
        let searchStr: string = category.fields[0].innerText.toUpperCase();
        this.searchParams[category.dataFieldName] = (val: string): boolean =>
          val.toUpperCase().indexOf(searchStr) >= 0;
        break;
      }
    }
  }

  protected priceFilterConfigure(categories: Array<Category>): void {
    for (const category of categories) {
      if (category.title == "Цена") {
        let from: number = Number.parseFloat(category.fields[0].innerText);
        let to: number = Number.parseFloat(category.fields[1].innerText);
        if (to && from)
          this.priceParams[category.dataFieldName] = val =>
            from <= val && val <= to;
        else if (from)
          this.priceParams[category.dataFieldName] = val => from <= val;
        else if (to)
          this.priceParams[category.dataFieldName] = val => val <= to;
        else delete this.priceParams[category.dataFieldName];
        return;
      }
    }
  }

  protected ageFilterConfigure(categories: Array<Category>): void {
    for (const category of categories) {
      if (category.title == "Возраст") {
        let from: number = Number.parseFloat(category.fields[0].innerText);
        let to: number = Number.parseFloat(category.fields[1].innerText);
        if (to && from)
          this.filterParams[category.dataFieldName] = val =>
            from <= val.from && val.to <= to;
        else if (from)
          this.filterParams[category.dataFieldName] = val => from <= val.from;
        else if (to)
          this.filterParams[category.dataFieldName] = val => val.to <= to;
        else delete this.filterParams[category.dataFieldName];
        return;
      }
    }
  }

  protected timeFilterConfigure(categories: Array<Category>): void {
    for (const category of categories) {
      if (category.title == "Время работы") {
        let from: number = this.getTimeInSeconds(category.fields[0].innerText);
        let to: number = this.getTimeInSeconds(category.fields[1].innerText);
        if (to && from)
          this.filterParams[category.dataFieldName] = val =>
            from <= val.from && val.to <= to;
        else if (from)
          this.filterParams[category.dataFieldName] = val => from <= val.from;
        else if (to)
          this.filterParams[category.dataFieldName] = val => val.to <= to;
        else delete this.filterParams[category.dataFieldName];
        return;
      }
    }
  }

  protected groupFilterConfigure(categories: Array<Category>): void {
    for (const category of categories) {
      if (category.title == "Состав группы") {
        let from: number = Number.parseInt(category.fields[0].innerText);
        let to: number = Number.parseInt(category.fields[1].innerText);
        if (to && from)
          this.filterParams[category.dataFieldName] = val =>
            from <= val.from && val.to <= to;
        else if (from)
          this.filterParams[category.dataFieldName] = val => from <= val.from;
        else if (to)
          this.filterParams[category.dataFieldName] = val => val.to <= to;
        else delete this.filterParams[category.dataFieldName];
        return;
      }
    }
  }

  private getTimeInSeconds(time: string): number {
    let seconds: number = 0;

    if (!time) return seconds;

    let hoursAndMinuts: Array<string> = time.split(":");
    let hours: number = Number.parseInt(hoursAndMinuts[0]);
    let minutes: number = Number.parseInt(hoursAndMinuts[1]);

    if (!hours) hours = 24;

    seconds = hours * 60 * 60;
    seconds += minutes * 60;

    return seconds;
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
            this.filterParams[category.dataFieldName] = val =>
              select.filter(value => val.includes(value)).length != 0;
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
    this.subscription = filter.categories.subscribe(
      (categories: Array<Category>): void => {
        if (categories.length == 0) return;
        this.searchFilterConfigure(categories);
        this.priceFilterConfigure(categories);
        this.ageFilterConfigure(categories);
        this.timeFilterConfigure(categories);
        this.groupFilterConfigure(categories);
        this.filterConfigure(categories);
        this.configure();
      }
    );
  }

  public getFilteredData(
    filter: Filter,
    startAt: number,
    offset: number
  ): Observable<Array<T>> {
    this.applyFilters(filter);
    return this.getAllConvertedData<T>().pipe(
      map(
        (convertedData: Array<T>): Array<T> => {
          let data: Array<T> = _.filter<T>(convertedData, this.filterIterator);
          if ((startAt || startAt == 0) && offset) {
            return data.slice(startAt, startAt + offset);
          }
          return data;
        }
      )
    );
  }
  public getPaginationData(
    filter: Filter,
    startAt: number,
    offset: number
  ): Observable<Array<T>> {
    return this.convertData(
      this.afs
        .collection(this.collection, ref => {
          if (this.collection === "news")
            return ref.orderBy("date", "desc");
          else
            return ref.orderBy("title", "desc");
        })
        .snapshotChanges()
    ).pipe(
      map(
        (convertedData: Array<T>): Array<T> => {
          if ((startAt || startAt == 0) && offset) {
            return convertedData.slice(startAt, startAt + offset);
          }
          return convertedData;
        }
      )
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.filterParams = {};
      this.priceParams = {};
      this.searchParams = {};
    }
  }
}
