import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

import { MainPageComponent } from "./components/main-page/main-page.component";
import { MenuItemService } from "./services/menu-item-service/menu-item.service";
import { MenuComponent } from "./components/menu/menu.component";
import { NewsComponent } from "./components/news/news.component";
import { NewsService } from "./services/news/news.service";
import { ShopComponent } from "./components/shop/shop.component";
import { ProductService } from "./services/product/product.service";
import { CrowdfundingComponent } from "./components/crowdfunding/crowdfunding.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MaterialModule } from "./modules/material/material.module";
import { OthersModule } from "./modules/others/others.module";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainPageComponent,
    MenuComponent,
    NewsComponent,
    NavBarComponent,
    ShopComponent,
    CrowdfundingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    OthersModule
  ],
  providers: [MenuItemService, NewsService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {}
