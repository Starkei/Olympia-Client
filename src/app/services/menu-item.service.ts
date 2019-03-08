import { Injectable } from "@angular/core";
import { MenuItem } from "../interfaces/menu-item";

@Injectable({
  providedIn: "root"
})
export class MenuItemService {
  private menuItems: Array<MenuItem> = [];

  constructor() {
    this.menuItems.push({
      title: "Питание",
      image: "assets/images/eat.jpg",
      description: "Тут вы сможете узнать как правильно питаться."
    });

    this.menuItems.push({
      title: "Питание",
      image: "assets/images/eat.jpg",
      description: "Тут вы сможете узнать как правильно питаться."
    });

    this.menuItems.push({
      title: "Питание",
      image: "assets/images/eat.jpg",
      description: "Тут вы сможете узнать как правильно питаться."
    });

    this.menuItems.push({
      title: "Питание",
      image: "assets/images/eat.jpg",
      description: "Тут вы сможете узнать как правильно питаться."
    });

    this.menuItems.push({
      title: "Питание",
      image: "assets/images/eat.jpg",
      description: "Тут вы сможете узнать как правильно питаться."
    });

    this.menuItems.push({
      title: "Питание",
      image: "assets/images/eat.jpg",
      description: "Тут вы сможете узнать как правильно питаться."
    });
  }

  getMenuItems(): Array<MenuItem> {
    return this.menuItems;
  }
}
