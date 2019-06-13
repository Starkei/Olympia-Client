import { Filter } from "src/app/engine/interfaces/filter";
import { Category } from "src/app/interfaces/category";
import { Observable, of } from "rxjs";
import { TrainingService } from "src/app/services/training/training.service";
import { Training } from "../../interfaces/training";
import { Field } from "src/app/engine/interfaces/field";
import { FilterGenerator } from "src/app/engine/classes/filter-generator/filter-generator";

export class TrainingFilter extends FilterGenerator<Training> {
  constructor(private service: TrainingService) {
    super();
    this.service.getAllConvertedData<Training>().subscribe(
      (data: Array<Training>): void => {
        let categories: Array<Category> = [];
        categories.push({
          fields: [
            { fieldType: "input", inputPlaceHolder: "Поиск", inputType: "text" }
          ],
          title: "Поиск",
          dataFieldName: "title"
        });
        categories.push({
          fields: [
            { fieldType: "input", inputPlaceHolder: "от", inputType: "number" },
            { fieldType: "input", inputPlaceHolder: "до", inputType: "number" }
          ],
          title: "Цена",
          dataFieldName: "price"
        });
        this.categories = of(categories);
      }
    );
  }
}
