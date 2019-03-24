import { Filter } from "src/app/interfaces/filter";
import { Category } from "src/app/interfaces/category";
import { of, Observable } from "rxjs";
import { CrowdfundingService } from "src/app/services/crowdfunding/crowdfunding.service";
import { Crowdfunding } from "../crowdfunding/crowdfunding";
import { Field } from "src/app/interfaces/field";

export class CrowdfundingFilter implements Filter {
  categories: Observable<Array<Category>>;

  constructor(private service: CrowdfundingService) {
    this.service.getAllItems().subscribe(
      (data: Array<Crowdfunding>): void => {
        let categories: Array<Category> = [];
        categories.push({
          fields: [
            { fieldType: "input", inputPlaceHolder: "Поиск", inputType: "text" }
          ],
          title: "Поиск"
        });
        categories.push({
          fields: [
            { fieldType: "input", inputPlaceHolder: "от", inputType: "number" },
            { fieldType: "input", inputPlaceHolder: "до", inputType: "number" }
          ],
          title: "Цена"
        });

        categories.push({
          fields: this.createAllTypesFields(data),
          title: "Тип"
        });

        categories.push({
          fields: this.createAllUsageField(data),
          title: "Использование"
        });

        this.categories = of(categories);
      }
    );
  }

  createAllTypesFields(data: Array<Crowdfunding>): Array<Field> {
    let titles: Array<string> = this.getAllTypes(data);
    return this.addCheckBoxFields(titles);
  }

  createAllUsageField(data: Array<Crowdfunding>): Array<Field> {
    let titles: Array<string> = this.getAllUsage(data);
    return this.addCheckBoxFields(titles);
  }

  getAllTypes(data: Array<Crowdfunding>): Array<string> {
    let types: Set<string> = new Set();
    data.forEach(
      (element: Crowdfunding): void => {
        element.type.forEach(
          (type: string): void => {
            types.add(type);
          }
        );
      }
    );

    return Array.from(types);
  }

  getAllUsage(data: Array<Crowdfunding>): Array<string> {
    let usages: Set<string> = new Set();
    data.forEach(
      (element: Crowdfunding): void => {
        element.usage.forEach(
          (use: string): void => {
            usages.add(use);
          }
        );
      }
    );

    return Array.from(usages);
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
}
