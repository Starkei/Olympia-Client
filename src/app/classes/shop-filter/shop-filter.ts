import { Filter } from "src/app/interfaces/filter";
import { Category } from "src/app/interfaces/category";
import { of, Observable } from "rxjs";

export class ShopFilter implements Filter {
  categories: Observable<Array<Category>> = of([]);
  constructor() {
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
      fields: [
        { fieldType: "checkbox", title: "Питание", checked: false },
        { fieldType: "checkbox", title: "Одежда", checked: false },
        { fieldType: "checkbox", title: "Тренажеры", checked: false },
        {
          fieldType: "checkbox",
          title: "Ортопедическаие товары",
          checked: false
        },
        { fieldType: "checkbox", title: "Средства гигиены", checked: false }
      ],
      title: "Тип"
    });
    categories.push({
      fields: [
        { fieldType: "checkbox", title: "Adidas", checked: false },
        { fieldType: "checkbox", title: "Nike", checked: false },
        { fieldType: "checkbox", title: "Reebok", checked: false },
        { fieldType: "checkbox", title: "Puma", checked: false }
      ],
      title: "Фирма"
    });

    this.categories = of(categories);
  }
}
