import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatButtonModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatPaginatorIntl
} from "@angular/material";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { LayoutModule } from "@angular/cdk/layout";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    LayoutModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: (): MatPaginatorIntl => {
        const paginator: MatPaginatorIntl = new MatPaginatorIntl();
        paginator.itemsPerPageLabel = "Элементов на страницу";
        return paginator;
      }
    }
  ]
})
export class MaterialModule {}
