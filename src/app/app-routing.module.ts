import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { TrainingComponent } from "./components/training/training.component";
import { ShopComponent } from "./components/shop/shop.component";
import { CrowdfundingComponent } from "./components/crowdfunding/crowdfunding.component";
import { PersonalAreaComponent } from "./components/personal-area/personal-area.component";

const routes: Routes = [
  { path: "", redirectTo: "/main", pathMatch: "full" },
  { path: "main", component: MainPageComponent },
  { path: "training", component: TrainingComponent },
  { path: "shop", component: ShopComponent },
  { path: "crowdfunding", component: CrowdfundingComponent },
  { path: "area", component: PersonalAreaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
