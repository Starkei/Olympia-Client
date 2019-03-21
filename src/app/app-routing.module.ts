import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { CarAboutEatComponent } from "./components/car-about-eat/car-about-eat.component";
import { TrainingComponent } from "./components/training/training.component";
import { ShopComponent } from "./components/shop/shop.component";
import { CrowdfundingComponent } from "./components/crowdfunding/crowdfunding.component";
import { PersonalAreaComponent } from "./components/personal-area/personal-area.component";
import { SportPageComponent } from "./components/sport-page/sport-page.component";
import { OutputDetailsComponent } from "./components/output-details/output-details.component";

const routes: Routes = [
  { path: "", redirectTo: "/main", pathMatch: "full" },
  { path: "main", component: MainPageComponent },
  { path: "cardabouteat", component: CarAboutEatComponent },
  { path: "training", component: TrainingComponent },
  { path: "shop", component: ShopComponent },
  { path: "crowdfunding", component: CrowdfundingComponent },
  { path: "area", component: PersonalAreaComponent },
  { path: "sport", component: SportPageComponent },
  {
    path: "output-details",
    component: OutputDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
