import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { NutritionistComponent } from './pages/nutritionist/nutritionist.component';
import{FlexLayoutModule} from "@angular/flex-layout";
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';

@NgModule({
  declarations: [AppComponent, NutritionistComponent, NavBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
