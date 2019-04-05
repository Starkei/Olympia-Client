import { Category } from "src/app/interfaces/category";
import { of } from "rxjs";
import { CrowdfundingService } from "src/app/services/crowdfunding/crowdfunding.service";
import { Crowdfunding } from "../../interfaces/models/crowdfunding";
import { Field } from "src/app/engine/interfaces/field";
import { FilterGenerator } from "src/app/engine/classes/filter-generator/filter-generator";

export class CrowdfundingFilter extends FilterGenerator<Crowdfunding> {
  constructor(private service: CrowdfundingService) {
    super();
    this.service.getAllConvertedData<Crowdfunding>().subscribe(
      (data: Array<Crowdfunding>): void => {
        let categories: Array<Category> = [];
        categories.push({
          fields: [{ fieldType: "input", inputPlaceHolder: "Поиск", inputType: "text" }],
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
        categories.push({
          fields: this.createAllTypesFields(data),
          title: "Тип",
          dataFieldName: "type"
        });

        categories.push({
          fields: this.createAllUsageField(data),
          title: "Использование",
          dataFieldName: "usage"
        });

        this.categories = of(categories);
      }
    );
  }

  private createAllTypesFields(data: Array<Crowdfunding>): Array<Field> {
    let titles: Array<string> = Array.from(this.getSetFromArrayPropertiesValues(data, "type"));

    return this.generateCheckBoxFields(titles);
  }

  private createAllUsageField(data: Array<Crowdfunding>): Array<Field> {
    let titles: Array<string> = Array.from(this.getSetFromArrayPropertiesValues(data, "usage"));
    return this.generateCheckBoxFields(titles);
  }
}
