import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthService } from "src/app/services/auth/Auth.service";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularFireAuthModule, AngularFirestoreModule],
  exports: [FlexLayoutModule],
  providers: [AuthService]
})
export class OthersModule {}
