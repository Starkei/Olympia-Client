import { Filter } from "src/app/interfaces/filter";
import { Category } from "src/app/interfaces/category";
import { of, Observable } from "rxjs";

export class CrowdfundingFilter implements Filter {
  categories: Observable<Array<Category>> = of([]);

  constructor() {
    let categories: Array<Category> = [];
    categories.push({
      title: "Клубы и секции",
      fields: [
        { fieldType: "checkbox", title: "Единоборства" },
        { fieldType: "checkbox", title: "Плавание" },
        { fieldType: "checkbox", title: "Танцы" }
      ]
    });
    categories.push({
      title: "Питание",
      fields: [
        { fieldType: "checkbox", title: "Энергитические добавки" },
        { fieldType: "checkbox", title: "Низкоколорийная еда" }
      ]
    });
    categories.push({
      title: "Магазин спорт товаров",
      fields: [
        { fieldType: "checkbox", title: "Одежда" },
        { fieldType: "checkbox", title: "Тренажеры" },
        { fieldType: "checkbox", title: "Мебель" }
      ]
    });

    this.categories = of(categories);
  }
}
