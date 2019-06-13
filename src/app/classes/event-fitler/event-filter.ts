import { Filter } from "src/app/engine/interfaces/filter";
import { Category } from "src/app/interfaces/category";
import { Observable, of } from "rxjs";
import { EventService } from "src/app/services/event/event.service";
import { Event } from "../../interfaces/models/event";
import { Field } from "src/app/engine/interfaces/field";
import { FilterGenerator } from "src/app/engine/classes/filter-generator/filter-generator";

export class EventFilter extends FilterGenerator<Event> {
  constructor(private service: EventService) {
    super();
    this.service.getAllConvertedData<Event>().subscribe(
      (data: Array<Event>): void => {
        let categories: Array<Category> = [];
        categories.push({
          fields: [
            { fieldType: "input", inputPlaceHolder: "Поиск", inputType: "text" }
          ],
          title: "Поиск",
          dataFieldName: "title"
        });
        this.categories = of(categories);
      }
    );
  }
}


