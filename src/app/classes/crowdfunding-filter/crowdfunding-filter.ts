import { Filter } from "src/app/interfaces/filter";
import { Category } from "src/app/interfaces/category";

export class CrowdfundingFilter implements Filter {
  categories: Array<Category> = [];

  constructor() {
    this.categories.push({
      title: "Клубы и секции",
      fields: [
        { fieldType: "checkbox", title: "Единоборства" },
        { fieldType: "checkbox", title: "Плавание" },
        { fieldType: "checkbox", title: "Танцы" }
      ]
    });
    this.categories.push({
      title: "Питание",
      fields: [
        { fieldType: "checkbox", title: "Энергитические добавки" },
        { fieldType: "checkbox", title: "Низкоколорийная еда" }
      ]
    });
    this.categories.push({
      title: "Магазин спорт товаров",
      fields: [
        { fieldType: "checkbox", title: "Одежда" },
        { fieldType: "checkbox", title: "Тренажеры" },
        { fieldType: "checkbox", title: "Мебель" }
      ]
    });
  }
}
