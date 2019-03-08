import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { OthersModule } from "./others/others.module";
import { MenuItemService } from "./services/menu-item.service";
import { MenuComponent } from "./components/menu/menu.component";
import { NewsComponent } from "./components/news/news.component";
import { NewsService } from "./services/news/news.service";

@NgModule({
  declarations: [AppComponent, MainPageComponent, MenuComponent, NewsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    OthersModule
  ],
  providers: [MenuItemService, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
