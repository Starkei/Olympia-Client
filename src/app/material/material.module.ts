import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MatButtonModule, MatCardModule, MatDividerModule]
})
export class MaterialModule {}
