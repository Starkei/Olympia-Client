import { Component, OnInit, OnDestroy } from "@angular/core";

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { AuthService } from "src/app/services/auth/Auth.service";
import { EventService } from "src/app/services/event/event.service";
import { User } from "src/app/interfaces/auth";
import { UploaderService } from "src/app/services/uploader-service/uploader.service";
import { Event } from "src/app/interfaces/models/event";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PersonalAreaService } from "src/app/services/peronal_area/personal-area.service";
import { MatDialog, MatDialogRef, MatSnackBar } from "@angular/material";
import { ProductCreatorComponent } from "../../shared/creators/product-creator/product-creator.component";
import { Subscription } from "rxjs";
import { EditProfileComponent } from "../../shared/edit-profile/edit-profile.component";
import { AddEventDialogComponent } from "../../shared/add-event-dialog/add-event-dialog.component";
import { AddProductDialogComponent } from "../../shared/add-product-dialog/add-product-dialog.component";
import { AddTrainingDialogComponent } from "../../shared/add-training-dialog/add-training-dialog.component";
import { AddSportDialogComponent } from "../../shared/add-sport-dialog/add-sport-dialog.component";
import { switchMap } from "rxjs/operators";
@Component({
  selector: "app-personal-area",
  templateUrl: "./personal-area.component.html",
  styleUrls: ["./personal-area.component.scss"]
})
export class PersonalAreaComponent implements OnInit, OnDestroy {
  area: Array<any> = [];

  prod: Array<any> = [];
  myevents: Array<any> = [];
  myprod: Array<any> = [];
  mysport: Array<any> = [];
  mytr: Array<any> = [];

  private fxSizeEvent: number = 0;
  private fxSizeInfo: number = 0;
  private fxSizeCont: number = 0;
  private fxSizeStat: number = 0;
  private fxSizeUser: number = 0;
  private fxSizeChat: number = 0;
  private fxmyevent: number = 0;
  private fxmfavprod: number = 0;
  private fxmyprod: number = 0;
  private fxmytraining: number = 0;
  private fxmysport: number = 0;
  private fxmyuser: number = 0;
  private fxmyinstr: number = 0;
  user: User;
  userRole: boolean = true;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public auth: AuthService,
    private eventService: EventService,
    private bp: BreakpointObserver,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public uploader: UploaderService
  ) {}

  ngOnInit() {
    this.bp
      .observe([
        Breakpoints.Medium,
        Breakpoints.Small,
        Breakpoints.XSmall,
        Breakpoints.Large
      ])
      .subscribe(
        (result: BreakpointState): void => {
          if (result.breakpoints[Breakpoints.Large]) {
            this.fxSizeEvent = 20;
            this.fxSizeInfo = 80;
            this.fxSizeCont = 32;
            this.fxSizeStat = 23;
            this.fxSizeUser = 58;
            this.fxSizeChat = 42;
            this.fxmyevent = 20;
            this.fxmfavprod = 20;
            this.fxmyprod = 20;
            this.fxmytraining = 20;
            this.fxmysport = 20;
            this.fxmyuser = 20;
            this.fxmyinstr = 55;
            console.clear();
            console.log("Large");
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.fxSizeEvent = 32;
            this.fxSizeInfo = 90;
            this.fxSizeCont = 42;
            this.fxSizeStat = 40;
            this.fxSizeUser = 50;
            this.fxSizeChat = 36;
            this.fxmyevent = 32;
            this.fxmfavprod = 32;
            this.fxmyprod = 32;
            this.fxmytraining = 32;
            this.fxmysport = 32;
            this.fxmyuser = 40;
            this.fxmyinstr = 15;
            console.clear();
            console.log("Medium");
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.fxSizeEvent = 35;
            this.fxSizeInfo = 85;
            this.fxSizeCont = 45;
            this.fxSizeStat = 40;
            this.fxSizeUser = 45;
            this.fxSizeChat = 36;
            this.fxmyevent = 35;
            this.fxmfavprod = 35;
            this.fxmyprod = 35;
            this.fxmytraining = 35;
            this.fxmysport = 35;
            this.fxmyuser = 35;
            this.fxmyinstr = 13;
            console.clear();
            console.log("Small");
          }
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.fxSizeEvent = 90;
            this.fxSizeInfo = 100;
            this.fxSizeCont = 100;
            this.fxSizeStat = 90;
            this.fxSizeUser = 100;
            this.fxSizeChat = 30;
            this.fxmyevent = 90;
            this.fxmfavprod = 90;
            this.fxmyprod = 90;
            this.fxmytraining = 90;
            this.fxmysport = 90;
            this.fxmyuser = 20;
            this.fxmyinstr = 20;
            console.clear();
            console.log("XSmall");
          }
        }
      );
    this.getInfo();
    this.getFavoriteEvents();
    this.getFavoriteProduct();
    this.getMyEvents();
    this.getMyProduct();
    this.getMySport();
    this.getMyTraining();
    this.checkRole();
  }

  getFxSizemyUser(): string {
    return this.fxmyuser + "%";
  }
  getFxSizemyInstr(): string {
    return this.fxmyinstr + "%";
  }
  getFxSizemytrain(): string {
    return this.fxmytraining + "%";
  }
  getFxSizemysport(): string {
    return this.fxmysport + "%";
  }
  getFxSizefavprod(): string {
    return this.fxmyprod + "%";
  }
  getFxSizemyprod(): string {
    return this.fxmfavprod + "%";
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
  getFxSize33(): string {
    return this.fxmyevent + "%";
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

  checkRole() {
    let userSubscribtion = this.auth.user.subscribe(data => {
      if (data.role == "User") {
        this.userRole = false;
      }
    });
  }

  update() {
    this.myevents = [];
    this.area = [];
    this.myprod = [];
    this.prod = [];
    this.mysport = [];
    this.mytr = [];
    this.getFavoriteEvents();
    this.getFavoriteProduct();
    this.getMyProduct();
    this.getMyEvents();
    this.getMySport();
    this.getMyTraining();
  }

  public getFavoriteEvents(): void {
    let userSubscribtion = this.auth.user.subscribe(data => {
      for (let favev of data.favoritesEvents) {
        this.eventService
          .getConvertedDocumentFromCollection(favev, "events")
          .subscribe(data => {
            this.area.push(data);
          });
      }
      userSubscribtion.unsubscribe();
    });
  }

  public getMyEvents(): void {
    let userSubscribtion = this.auth.user.subscribe(data => {
      for (let myev of data.myEvents) {
        this.eventService
          .getConvertedDocumentFromCollection(myev, "events")
          .subscribe(data => {
            this.myevents.push(data);
          });
      }
      userSubscribtion.unsubscribe();
    });
  }

  openAddEvent(): void {
    let dialogRef = this.dialog.open(AddEventDialogComponent, {
      data: { myevent: this.myevents }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.update();
    });
  }

  public getMyProduct(): void {
    let userSubscribtion = this.auth.user.subscribe(data => {
      for (let mypr of data.myProducts) {
        this.eventService
          .getConvertedDocumentFromCollection(mypr, "products")
          .subscribe(data => {
            this.myprod.push(data);
          });
      }
      userSubscribtion.unsubscribe();
    });
  }

  openAddProduct(): void {
    let dialogRef = this.dialog.open(AddProductDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.update();
    });
  }
  public getMySport(): void {
    let userSubscribtion = this.auth.user.subscribe(data => {
      for (let mypr of data.mySports) {
        this.eventService
          .getConvertedDocumentFromCollection(mypr, "sports")
          .subscribe(data => {
            this.mysport.push(data);
          });
      }
      userSubscribtion.unsubscribe();
    });
  }
  openAddSport(): void {
    let dialogRef = this.dialog.open(AddSportDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.update();
    });
  }
  public getMyTraining(): void {
    let userSubscribtion = this.auth.user.subscribe(data => {
      for (let mypr of data.myTrainings) {
        this.eventService
          .getConvertedDocumentFromCollection(mypr, "trainings")
          .subscribe(data => {
            this.mytr.push(data);
          });
      }
      userSubscribtion.unsubscribe();
    });
  }
  openAddTraining(): void {
    let dialogRef = this.dialog.open(AddTrainingDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.update();
    });
  }
  public getFavoriteProduct(): void {
    let userSubscribtion = this.auth.user.subscribe(data => {
      for (let favprod of data.favoriteProduct) {
        this.eventService
          .getConvertedDocumentFromCollection(favprod, "products")
          .subscribe(data => {
            this.prod.push(data);
          });
      }
      userSubscribtion.unsubscribe();
    });
  }
  followEvents(item: any): void {
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "events" }
    ]);
  }

  followProducts(item: any): void {
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "products" }
    ]);
  }
  followMyProducts(item: any): void {
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "products" }
    ]);
  }
  followMyEvent(item: any): void {
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "events" }
    ]);
  }
  followMyTraining(item: any): void {
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "trainings" }
    ]);
  }
  followMySport(item: any): void {
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "sports" }
    ]);
  }
  ngOnDestroy() {}

  public getInfo(): void {
    let userSubscribtion = this.auth.user.subscribe(
      (userInfo: User): void => {
        if (!userInfo.photoURL && !userInfo.image)
          if ((userInfo.sex = "Мужской"))
            userInfo.image =
              "https://firebasestorage.googleapis.com/v0/b/olympia-be079.appspot.com/o/usersImages%2Fmale.png?alt=media&token=425a0e79-09cd-475f-9add-bae580e166b2";
          else
            userInfo.image =
              "https://firebasestorage.googleapis.com/v0/b/olympia-be079.appspot.com/o/usersImages%2Ffemale.png?alt=media&token=cb414b74-c996-493f-a38b-73711cb12d97";
        this.user = userInfo;
      }
    );
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
    let ref: MatDialogRef<ProductCreatorComponent> = this.dialog.open(
      ProductCreatorComponent
    );
    this.showSnackBar<ProductCreatorComponent>(ref);
  }

  public openEditProfile(): void {
    let ref: MatDialogRef<EditProfileComponent> = this.dialog.open(
      EditProfileComponent
    );
    ref.afterClosed().subscribe(result => {
      this.update();
    });
    this.showSnackBar<EditProfileComponent>(ref);
  }
}
