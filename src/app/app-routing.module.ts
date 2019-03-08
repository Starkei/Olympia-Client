import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { ShopComponent } from "./components/shop/shop.component";

const routes: Routes = [
  { path: "", redirectTo: "/main", pathMatch: "full" },
  { path: "main", component: MainPageComponent },
  { path: "shop", component: ShopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
