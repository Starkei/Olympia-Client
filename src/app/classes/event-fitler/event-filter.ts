import { Filter } from "src/app/interfaces/filter";
import { Category } from "src/app/interfaces/category";
import { Observable, of } from "rxjs";
import { EventService } from "src/app/services/event/event.service";
import { Event } from "../../interfaces/models/event";

export class EventFilter implements Filter {
  categories: Observable<Array<Category>>;

  constructor(private service: EventService) {
    this.service.getAllData().subscribe(
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
