import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

import { MainPageComponent } from "./components/main-page/main-page.component";
import { MenuComponent } from "./components/menu/menu.component";
import { NewsComponent } from "./components/news/news.component";
import { NewsService } from "./services/news/news.service";

import { TrainingComponent } from "./components/training/training.component";
import { ShopComponent } from "./components/shop/shop.component";
import { ProductService } from "./services/product/product.service";
import { CrowdfundingComponent } from "./components/crowdfunding/crowdfunding.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MaterialModule } from "./modules/material/material.module";
import { OthersModule } from "./modules/others/others.module";
import { HorizontalCardComponent } from "./components/horizontal-card/horizontal-card.component";
import { MenuItemService } from "./services/menu-item/menu-item.service";
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainPageComponent,
    MenuComponent,
    NewsComponent,
    NavBarComponent,
    TrainingComponent,
    ShopComponent,
    CrowdfundingComponent,
    HorizontalCardComponent,
    PersonalAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    OthersModule
  ],
  providers: [
    MenuItemService,
    NewsService,
    ProductService,
    CrowdfundingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
