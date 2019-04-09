import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainPageComponent } from "./components/pages/main-page/main-page.component";
import { CarAboutEatComponent } from "./components/pages/car-about-eat-page/car-about-eat.component";
import { TrainingComponent } from "./components/pages/training-page/training.component";
import { ShopComponent } from "./components/pages/shop-page/shop.component";
import { CrowdfundingComponent } from "./components/pages/crowdfunding-page/crowdfunding.component";
import { PersonalAreaComponent } from "./components/pages/personal-area-page/personal-area.component";
import { SportPageComponent } from "./components/pages/sport-page/sport-page.component";
import { RegistrationComponent } from "./components/pages/registration-page/registration.component";
import { EventsComponent } from "./components/pages/events-page/events.component";
import { OutputDetailsComponent } from "./components/shared/output-component/output-details/output-details.component";
import { UploaderComponent } from "./components/shared/uploader/uploader/uploader.component";
import { ChatComponent } from "./components/pages/chat-page/chat.component";

const routes: Routes = [
  { path: "", redirectTo: "/main", pathMatch: "full" },
  { path: "main", component: MainPageComponent },
  { path: "cardabouteat", component: CarAboutEatComponent },
  { path: "training", component: TrainingComponent },
  { path: "shop", component: ShopComponent },
  { path: "crowdfunding", component: CrowdfundingComponent },
  { path: "area", component: PersonalAreaComponent },
  { path: "sport", component: SportPageComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "events", component: EventsComponent },
  {
    path: "output-details",
    component: OutputDetailsComponent
  },
  {
    path: "uploader",
    component: UploaderComponent
  },
  {
    path: "chats",
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
