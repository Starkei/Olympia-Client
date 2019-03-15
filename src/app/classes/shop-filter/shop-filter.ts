import { Filter } from "src/app/interfaces/filter";
import { Category } from "src/app/interfaces/category";

export class ShopFilter implements Filter {
  categories: Array<Category> = [];
  constructor() {
    this.categories.push({
      fields: [
        { fieldType: "input", inputPlaceHolder: "от", inputType: "number" },
        { fieldType: "input", inputPlaceHolder: "до", inputType: "number" }
      ],
      title: "Цена"
    });
    this.categories.push({
      fields: [
        { fieldType: "checkbox", title: "Питание" },
        { fieldType: "checkbox", title: "Одежда" },
        { fieldType: "checkbox", title: "Тренажеры" },
        { fieldType: "checkbox", title: "Ортопедическаие товары" },
        { fieldType: "checkbox", title: "Средства гигиены" }
      ],
      title: "Тип"
    });
    this.categories.push({
      fields: [
        { fieldType: "checkbox", title: "Adidas" },
        { fieldType: "checkbox", title: "Nike" },
        { fieldType: "checkbox", title: "Reebok" },
        { fieldType: "checkbox", title: "Puma" }
      ],
      title: "Фирма"
    });
  }
}
