import { Filter } from "src/app/interfaces/filter";
import { Category } from "src/app/interfaces/category";
import { of, Observable } from "rxjs";
import { SportService } from "src/app/services/sport/sport.service";
import { Sport } from "../sport/sport";
import { Field } from "src/app/interfaces/field";

export class SportFilter implements Filter {
  categories: Observable<Array<Category>>;
  constructor(private service: SportService) {
    this.service.getAllSport().subscribe(
      (data: Array<Sport>): void => {
        let categoriesArray: Array<Category> = [];

        categoriesArray.push({
          fields: [
            { fieldType: "input", inputPlaceHolder: "Поиск", inputType: "text" }
          ],
          title: "Поиск"
        });

        categoriesArray.push({
          title: "Виды спорта",
          fields: this.createAllTypesFields(data)
        });

        categoriesArray.push({
          title: "Противопоказания",
          fields: this.createAllСontraindicationsTypes(data)
        });

        categoriesArray.push({
          title: "Метро",
          fields: this.createAllUndergroundFields(data)
        });

        this.categories = of(categoriesArray);
      }
    );
  }

  createAllTypesFields(sport: Array<Sport>): Array<Field> {
    let titles: Array<string> = this.getAllTypes(sport);
    return this.addCheckBoxFields(titles);
  }

  createAllСontraindicationsTypes(sport: Array<Sport>): Array<Field> {
    let titles: Array<string> = this.getAllСontraindications(sport);
    return this.addSelectFields(titles);
  }

  createAllUndergroundFields(sport: Array<Sport>): Array<Field> {
    let titles: Array<string> = this.getAllUndergrounds(sport);
    return this.addCheckBoxFields(titles);
  }

  getAllСontraindications(sports: Array<Sport>): Array<string> {
    let contraindications: Set<string> = new Set();
    sports.forEach(
      (sport: Sport): void => {
        sport.contraindications.forEach(
          (contraindication: string): void => {
            contraindications.add(contraindication);
          }
        );
      }
    );
    return Array.from(contraindications);
  }

  getAllTypes(sports: Array<Sport>): Array<string> {
    let types: Set<string> = new Set();
    sports.forEach(
      (sport: Sport): void => {
        sport.type.forEach(
          (type: string): void => {
            types.add(type);
          }
        );
      }
    );

    return Array.from(types);
  }

  getAllUndergrounds(sports: Array<Sport>): Array<string> {
    let types: Set<string> = new Set();
    sports.forEach(
      (sport: Sport): void => {
        types.add(sport.underground);
      }
    );

    return Array.from(types);
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

  addSelectFields(titles: Array<string>): Array<Field> {
    let fields: Array<Field> = [];
    fields.push({ fieldType: "select", selectItems: titles });
    return fields;
  }
}
