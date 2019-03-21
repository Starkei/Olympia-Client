import { Injectable } from "@angular/core";
import { Sport } from "src/app/classes/sport/sport";
import { AngularFirestore } from "@angular/fire/firestore";
import { Filterable } from "src/app/interfaces/filterable";
import { Filter } from "src/app/interfaces/filter";
import { Observable } from "rxjs";
import * as _ from "lodash";
import { map, filter } from "rxjs/operators";
import { Field } from "src/app/interfaces/field";
import { Category } from "src/app/interfaces/category";

@Injectable({
  providedIn: "root"
})
export class SportService implements Filterable {
  filterParametrs = {};
  searchParametrs = {};

  constructor(private afs: AngularFirestore) {}

  getFilteredData(filter: Filter): Observable<Array<Sport>> {
    this.configureFilter(filter);
    return this.afs
      .collection<Sport>("sports")
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            let data = action.payload.doc.data();
            let id = action.payload.doc.id;
            data.id = id;
            return new Sport(data as Sport);
          });
        })
      )
      .pipe(
        map(
          (sports: Array<Sport>): Array<Sport> => {
            return this.applyFilters(sports);
          }
        )
      );
  }

  configureFilter(filter: Filter): void {
    if (!filter.categories) return;
    filter.categories.subscribe(
      (data: Array<Category>): void => {
        if (data.length === 0) return;
        this.configureSearch(data);
        this.configureSports(data);
        this.configureUnderground(data);
      }
    );
  }

  configureSearch(categories: Array<Category>): void {
    if (categories[0].fields[0].innerText)
      this.searchParametrs["title"] = (val: string): boolean =>
        val
          .toUpperCase()
          .indexOf(categories[0].fields[0].innerText.toUpperCase()) >= 0;
    else {
      delete this.searchParametrs["title"];
    }
  }

  configureSports(categories: Array<Category>): void {
    let sports: Array<string> = [];
    categories[1].fields.forEach(
      (field: Field): void => {
        if (field.checked) sports.push(field.title);
      }
    );
    if (sports.length != 0)
      this.filterParametrs["type"] = (val: Array<string>): boolean =>
        sports.filter(value => val.includes(value)).length != 0;
    else {
      delete this.filterParametrs["type"];
    }
  }

  configureUnderground(categories: Array<Category>): void {
    let undergrounds: Array<string> = [];
    categories[3].fields.forEach(
      (field: Field): void => {
        if (field.checked) undergrounds.push(field.title);
      }
    );
    if (undergrounds.length != 0)
      this.filterParametrs["underground"] = (val: string): boolean =>
        undergrounds.includes(val);
    else {
      delete this.filterParametrs["underground"];
    }
  }

  applyFilters(data: Array<Sport>): Array<Sport> {
    let filteredData: Array<Sport> = _.filter(
      data,
      _.conforms(this.filterParametrs)
    );
    filteredData = _.filter(filteredData, _.conforms(this.searchParametrs));
    return filteredData;
  }

  getAllSport(): Observable<Array<Sport>> {
    return this.afs.collection<Sport>("sports").valueChanges();
  }
}
