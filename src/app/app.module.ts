import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/material/material.module";
import { CarAboutEatComponent } from "./components/car-about-eat/car-about-eat.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { NewsComponent } from "./components/news/news.component";
import { NewsService } from "./services/news/news.service";

import { TrainingComponent } from "./components/training/training.component";
import { ShopComponent } from "./components/shop/shop.component";
import { ProductService } from "./services/product/product.service";
import { CrowdfundingComponent } from "./components/crowdfunding/crowdfunding.component";
import { FooterComponent } from "./components/footer/footer.component";
import { OthersModule } from "./modules/others/others.module";
import { PersonalAreaComponent } from "./components/personal-area/personal-area.component";
import { BannerComponent } from "./components/banner/banner.component";
import { SportPageComponent } from "./components/sport-page/sport-page.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { FilterComponent } from "./components/filter/filter.component";
import { OutputComponent } from "./components/output/output.component";
import { FieldComponent } from "./components/field/field.component";
import { ScrollingDirective } from "./directives/scrolling/scrolling.directive";
import { AuthService } from "./services/core/auth.service";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { environment } from "../environments/environment";
import { TextLengthPipe } from "./pipes/text-length/text-length.pipe";
import { FormsModule } from "@angular/forms";

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MainPageComponent,
    NewsComponent,
    NavBarComponent,
    TrainingComponent,
    ShopComponent,
    CrowdfundingComponent,
    PersonalAreaComponent,
    CarAboutEatComponent,
    BannerComponent,
    SportPageComponent,
    RegistrationComponent,
    FilterComponent,
    OutputComponent,
    FieldComponent,
    ScrollingDirective,
    TextLengthPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    OthersModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],

  providers: [NewsService, ProductService, CrowdfundingComponent, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
