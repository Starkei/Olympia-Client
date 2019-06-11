import { Category } from "src/app/interfaces/category";
import { of } from "rxjs";
import { SportService } from "src/app/services/sport/sport.service";
import { Sport } from "../../interfaces/models/sport";
import { Field } from "src/app/engine/interfaces/field";
import { FilterGenerator } from "src/app/engine/classes/filter-generator/filter-generator";

export class SportFilter extends FilterGenerator<Sport> {
  constructor(private service: SportService) {
    super();
    this.service.getAllConvertedData<Sport>().subscribe(
      (data: Array<Sport>): void => {
        let categoriesArray: Array<Category> = [];

        categoriesArray.push({
          fields: [{ fieldType: "input", inputPlaceHolder: "Поиск", inputType: "text" }],
          title: "Поиск",
          dataFieldName: "title"
        });

        categoriesArray.push({
          fields: [
            { fieldType: "input", inputPlaceHolder: "от", inputType: "number" },
            { fieldType: "input", inputPlaceHolder: "до", inputType: "number" }
          ],
          title: "Цена",
          dataFieldName: "price"
        });

        categoriesArray.push({
          title: "Виды спорта",
          fields: this.createAllTypesFields(data),
          dataFieldName: "type"
        });

        categoriesArray.push({
          title: "Возраст",
          fields: [
            { fieldType: "input", inputPlaceHolder: "от", inputType: "number" },
            { fieldType: "input", inputPlaceHolder: "до", inputType: "number" }
          ],
          dataFieldName: "age"
        });

        categoriesArray.push({
          title: "Пол",
          fields: this.createAllSexFields(data),
          dataFieldName: "sex"
        });

        categoriesArray.push({
          title: "Время работы",
          fields: [
            { fieldType: "input", inputPlaceHolder: "от", inputType: "time" },
            { fieldType: "input", inputPlaceHolder: "до", inputType: "time" }
          ],
          dataFieldName: "timeWork"
        });

        categoriesArray.push({
          title: "Состав группы",
          fields: [
            { fieldType: "input", inputPlaceHolder: "от", inputType: "number" },
            { fieldType: "input", inputPlaceHolder: "до", inputType: "number" }
          ],
          dataFieldName: "group"
        });

        categoriesArray.push({
          title: "Метро",
          fields: this.createAllUndergroundFields(data),
          dataFieldName: "underground"
        });

        this.categories = of(categoriesArray);
      }
    );
  }

  private createAllTypesFields(sport: Array<Sport>): Array<Field> {
    let titles: Array<string> = Array.from(this.getSetFromArrayPropertiesValues(sport, "type"));
    return this.generateCheckBoxFields(titles);
  }

  private createAllSexFields(sport: Array<Sport>): Array<Field> {
    let sexes: Array<string> = Array.from(this.getSetFromArrayPropertiesValues(sport, "sex"));
    return this.generateCheckBoxFields(sexes);
  }

  private createAllUndergroundFields(sport: Array<Sport>): Array<Field> {
    let titles: Array<string> = Array.from(this.getSetOfPropertiesValues(sport, "underground"));
    return this.generateCheckBoxFields(titles);
  }
}
