import { Component, OnInit, OnDestroy } from "@angular/core";
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { AuthService } from "src/app/services/auth/Auth.service";
import { User } from "src/app/interfaces/auth";
import { Personal_Area } from "src/app/interfaces/peronal_area";
import { PersonalAreaService } from "src/app/services/peronal_area/personal-area.service";
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { ProductCreatorComponent } from "../../shared/creators/product-creator/product-creator.component";
import { Observable, Subscription } from "rxjs";
import { ShopComponent } from "../shop-page/shop.component";
import { ChatComponent } from "../chat-page/chat.component";
import { EditProfileComponent } from "../../shared/edit-profile/edit-profile.component";
@Component({
  selector: "app-personal-area",
  templateUrl: "./personal-area.component.html",
  styleUrls: ["./personal-area.component.scss"]
})
export class PersonalAreaComponent implements OnInit, OnDestroy {
  area: Array<Personal_Area> = [];
  private fxSizeEvent: number = 0;
  private fxSizeInfo: number = 0;
  private fxSizeCont: number = 0;
  private fxSizeStat: number = 0;
  private fxSizeUser: number = 0;
  private fxSizeChat: number = 0;
  user: User;
  userSubscribtion: Subscription;
  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    private service: PersonalAreaService,
    private bp: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getArea();

    this.bp.observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Large]).subscribe(
      (result: BreakpointState): void => {
        if (result.breakpoints[Breakpoints.Large]) {
          this.fxSizeEvent = 25;
          this.fxSizeInfo = 100;
          this.fxSizeCont = 30;
          this.fxSizeStat = 23;
          this.fxSizeUser = 58;
          this.fxSizeChat = 42;
          console.clear();
          console.log("Large");
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.fxSizeEvent = 29;
          this.fxSizeInfo = 90;
          this.fxSizeCont = 42;
          this.fxSizeStat = 40;
          this.fxSizeUser = 50;
          this.fxSizeChat = 36;
          console.clear();
          console.log("Medium");
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.fxSizeEvent = 45;
          this.fxSizeInfo = 85;
          this.fxSizeCont = 45;
          this.fxSizeStat = 40;
          this.fxSizeUser = 45;
          this.fxSizeChat = 36;
          console.clear();
          console.log("Small");
        }
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.fxSizeEvent = 90;
          this.fxSizeInfo = 100;
          this.fxSizeCont = 100;
          this.fxSizeStat = 90;
          this.fxSizeUser = 30;
          this.fxSizeChat = 30;
          console.clear();
          console.log("XSmall");
        }
      }
    );
    this.getInfo();
  }

  ngOnDestroy() {
    this.userSubscribtion.unsubscribe();
  }

  public getInfo(): void {
    this.userSubscribtion = this.auth.user.subscribe(
      (userInfo: User): void => {
        if (!userInfo.photoURL)
          if ((userInfo.sex = "Мужской"))
            userInfo.photoURL =
              "https://firebasestorage.googleapis.com/v0/b/olympia-be079.appspot.com/o/usersImages%2Fmale.png?alt=media&token=425a0e79-09cd-475f-9add-bae580e166b2";
          else
            userInfo.photoURL =
              "https://firebasestorage.googleapis.com/v0/b/olympia-be079.appspot.com/o/usersImages%2Ffemale.png?alt=media&token=cb414b74-c996-493f-a38b-73711cb12d97";
        this.user = userInfo;
      }
    );
  }
  getArea() {
    this.area = this.service.getArea();
  }
  getFxSize(): string {
    return this.fxSizeEvent + "%";
  }
  getFxSize2(): string {
    return this.fxSizeInfo + "%";
  }
  getFxSize3(): string {
    return this.fxSizeCont + "%";
  }
  getFxSize4(): string {
    return this.fxSizeStat + "%";
  }
  getFxSize5(): string {
    return this.fxSizeUser + "%";
  }
  getFxSize6(): string {
    return this.fxSizeChat + "%";
  }

  /**
   *
   * @description Форматирует дату из бд
   * @param {any} date - Дата для форматирования
   * @returns {string} - Отформатированая дата ввиде строки
   * @memberof PersonalAreaComponent
   */
  public getFormattedDateString(date: any): string {
    //Если даты несуществует возрващает сслыку на {null}
    if (!date) return null;

    //В firebase есть класс Timestamp, в котором есть метод toDate();
    return date.toDate().toLocaleDateString();
  }

  private showSnackBar<T>(ref: MatDialogRef<T>): void {
    ref.afterClosed().subscribe(data => {
      if (!data) data = "Преравано";
      this.snackBar.open(data, "Ок", { duration: 2000 });
    });
  }

  public openProductCreator(): void {
    let ref: MatDialogRef<ProductCreatorComponent> = this.dialog.open(ProductCreatorComponent);
    this.showSnackBar<ProductCreatorComponent>(ref);
  }

  public openEditProfile(): void {
    let ref: MatDialogRef<EditProfileComponent> = this.dialog.open(EditProfileComponent);
    this.showSnackBar<EditProfileComponent>(ref);
  }
}
