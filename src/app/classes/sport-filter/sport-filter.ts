import { Filter } from "src/app/interfaces/filter";
import { Category } from "src/app/interfaces/category";

export class SportFilter implements Filter {
  categories: Array<Category> = [];
  constructor() {
    this.categories.push({
      title: "Виды спорта",
      fields: [
        {
          fieldType: "checkbox",
          title: "Академическая гребля"
        },
        {
          fieldType: "checkbox",
          title: "Бадминтон"
        },
        {
          fieldType: "checkbox",
          title: "Баскетбол"
        },
        {
          fieldType: "checkbox",
          title: "Бокс"
        },
        {
          fieldType: "checkbox",
          title: "Борьба"
        },
        {
          fieldType: "checkbox",
          title: "Велоспорт"
        },
        {
          fieldType: "checkbox",
          title: "Водные виды спорта"
        },
        {
          fieldType: "checkbox",
          title: "Волейбол"
        }
      ]
    });
  }
}
