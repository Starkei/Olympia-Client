import { Component, OnInit } from "@angular/core";
import { MenuItem } from "src/app/interfaces/menu-item";
import { MenuItemService } from "src/app/services/menu-item-service/menu-item.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  menuItems: Array<MenuItem> = [];

  constructor(private menuItemService: MenuItemService) {
    this.menuItems = this.menuItemService.getMenuItems();
  }

  ngOnInit() {}
}
