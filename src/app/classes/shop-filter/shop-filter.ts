import { Filter } from "src/app/interfaces/filter";
import { Category } from "src/app/interfaces/category";

export class ShopFilter implements Filter {
  categories: Array<Category> = [];
  constructor() {
    this.categories.push({
      fields: [
        { fieldType: "input", inputPlaceHolder: "Поиск", inputType: "text" }
      ],
      title: "Поиск"
    });

    this.categories.push({
      fields: [
        { fieldType: "input", inputPlaceHolder: "от", inputType: "number" },
        { fieldType: "input", inputPlaceHolder: "до", inputType: "number" }
      ],
      title: "Цена"
    });
    this.categories.push({
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
    this.categories.push({
      fields: [
        { fieldType: "checkbox", title: "Adidas", checked: false },
        { fieldType: "checkbox", title: "Nike", checked: false },
        { fieldType: "checkbox", title: "Reebok", checked: false },
        { fieldType: "checkbox", title: "Puma", checked: false }
      ],
      title: "Фирма"
    });
  }
}
