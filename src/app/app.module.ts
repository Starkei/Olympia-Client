import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/material/material.module";
import { NewsService } from "./services/news/news.service";

import { ProductService } from "./services/product/product.service";
import { OthersModule } from "./modules/others/others.module";
import { ScrollingDirective } from "./directives/scrolling/scrolling.directive";
import { AuthService } from "./services/auth/Auth.service";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { environment } from "../environments/environment";
import { TextLengthPipe } from "./pipes/text-length/text-length.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ArrayFormatterPipe } from "./pipes/array-formatter/array-formatter.pipe";
import { CrowdfundingService } from "./services/crowdfunding/crowdfunding.service";
import { EventService } from "./services/event/event.service";
import { SportService } from "./services/sport/sport.service";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { FooterComponent } from "./components/core/footer/footer.component";
import { MainPageComponent } from "./components/pages/main-page/main-page.component";
import { NewsComponent } from "./components/shared/news-component/news/news.component";
import { NavBarComponent } from "./components/core/nav-bar/nav-bar.component";
import { TrainingComponent } from "./components/pages/training-page/training.component";
import { ShopComponent } from "./components/pages/shop-page/shop.component";
import { CrowdfundingComponent } from "./components/pages/crowdfunding-page/crowdfunding.component";
import { PersonalAreaComponent } from "./components/pages/personal-area-page/personal-area.component";
import { CarAboutEatComponent } from "./components/pages/car-about-eat-page/car-about-eat.component";
import { BannerComponent } from "./components/shared/banner/banner.component";
import { SportPageComponent } from "./components/pages/sport-page/sport-page.component";
import { RegistrationComponent } from "./components/pages/registration-page/registration.component";
import { FilterComponent } from "./components/shared/filter-component/filter/filter.component";
import { OutputComponent } from "./components/shared/output-component/output/output.component";
import { FieldComponent } from "./components/shared/filter-component/field/field.component";
import { OutputDetailsComponent } from "./components/shared/output-component/output-details/output-details.component";
import { EventsComponent } from "./components/pages/events-page/events.component";
import { UploaderComponent } from "./components/shared/uploader/uploader/uploader.component";
import { UploadTaskComponent } from "./components/shared/uploader/upload-task/upload-task.component";
import { ChatComponent } from "./components/pages/chat-page/chat.component";
import { ProductCreatorComponent } from "./components/shared/creators/product-creator/product-creator.component";
import { EditProfileComponent } from "./components/shared/edit-profile/edit-profile.component";
import { AdwareComponent } from "./components/shared/adware/adware.component";
import { AdminPanelComponent } from "./components/pages/admin-panel/admin-panel.component";
import { TableComponent } from "./components/shared/admin-panel-component/table/table.component";
import { HttpClientModule } from "@angular/common/http";
import { PostFormComponent } from "./components/shared/admin-panel-component/post-form/post-form.component";
import { AgmCoreModule } from "@agm/core";
import { GoogleMapComponent } from "./components/shared/google-map/google-map.component";
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
    TextLengthPipe,
    OutputDetailsComponent,
    ArrayFormatterPipe,
    EventsComponent,
    UploaderComponent,
    UploadTaskComponent,
    ChatComponent,
    ProductCreatorComponent,
    EditProfileComponent,
    AdwareComponent,
    AdminPanelComponent,
    TableComponent,
    PostFormComponent,
    GoogleMapComponent
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
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyANwlhlYARVvcdu7Fr8-CoZnL7Y4kD-FKs"
    })
  ],
  providers: [
    NewsService,
    ProductService,
    SportService,
    CrowdfundingService,
    EventService,
    CrowdfundingComponent,
    AuthService
  ],
  entryComponents: [
    ProductCreatorComponent,
    EditProfileComponent,
    AdwareComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
