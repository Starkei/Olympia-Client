import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule, MatExpansionModule, MatCheckboxModule, MatPaginatorModule, MatPaginatorIntl, MatDialogModule } from "@angular/material";
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
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatRadioModule } from "@angular/material/radio";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

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
    MatSlideToggleModule,
    MatRadioModule,
    MatStepperModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatMomentDateModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    LayoutModule,
    AngularFireModule,
    AngularFireAuthModule
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
