import { Category } from "src/app/interfaces/category";
import { of } from "rxjs";
import { SportService } from "src/app/services/sport/sport.service";
import { Sport } from "../../interfaces/models/sport";
import { Field } from "src/app/interfaces/field";
import { FilterGenerator } from "../engine/filter-generator/filter-generator";

export class SportFilter extends FilterGenerator<Sport> {
  constructor(private service: SportService) {
    super();
    this.service.getAllConvertedData<Sport>().subscribe(
      (data: Array<Sport>): void => {
        let categoriesArray: Array<Category> = [];

        categoriesArray.push({
          fields: [
            { fieldType: "input", inputPlaceHolder: "Поиск", inputType: "text" }
          ],
          title: "Поиск",
          dataFieldName: "title"
        });

        categoriesArray.push({
          title: "Виды спорта",
          fields: this.createAllTypesFields(data),
          dataFieldName: "type"
        });

        categoriesArray.push({
          title: "Противопоказания",
          fields: this.createAllСontraindicationsTypes(data),
          dataFieldName: "contraindications"
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
    let titles: Array<string> = Array.from(
      this.getSetFromArrayPropertiesValues(sport, "type")
    );
    return this.generateCheckBoxFields(titles);
  }

  private createAllСontraindicationsTypes(sport: Array<Sport>): Array<Field> {
    let selectItems: Array<string> = Array.from(
      this.getSetFromArrayPropertiesValues(sport, "contraindications")
    );
    return this.generateSelectField(selectItems);
  }

  private createAllUndergroundFields(sport: Array<Sport>): Array<Field> {
    let titles: Array<string> = Array.from(
      this.getSetOfPropertiesValues(sport, "underground")
    );
    return this.generateCheckBoxFields(titles);
  }
}
