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

  private itemsCollection: AngularFirestoreCollection<Event>;
  private fxSizeEvent: number = 0;
  private fxSizeInfo: number = 0;
  private fxSizeCont: number = 0;
  private fxSizeStat: number = 0;
  private fxSizeUser: number = 0;
  private fxSizeChat: number = 0;
  user: User;
  userSubscribtion: Subscription;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public auth: AuthService,
    private eventService: EventService,
    private bp: BreakpointObserver,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public uploader: UploaderService
  ) {
    // this.itemsCollection = afs.collection<Event>("events");
  }

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
    this.getFavoriteEvents();
    this.getFavoriteProduct();
    this.getMyEvents();
    this.getMyProduct();
    this.getMySport();
    this.getMyTraining();
  }

  public getFavoriteEvents(): void {
    this.userSubscribtion = this.auth.user.subscribe(data => {
      for (let favev of data.favoritesEvents) {
        this.eventService
          .getConvertedDocumentFromCollection(favev, "events")
          .subscribe(data => {
            this.area.push(data);
          });
      }
    });
  }

  public getMyEvents(): void {
    this.userSubscribtion = this.auth.user.subscribe(data => {
      for (let myev of data.myEvents) {
        this.eventService
          .getConvertedDocumentFromCollection(myev, "events")
          .subscribe(data => {
            this.myevents.push(data);
          });
      }
    });
    console.log(this.myevents);
  }

  openAddEvent(): void {
    let dialogRef = this.dialog.open(AddEventDialogComponent, {
      data: { myevent: this.myevents }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.myevents = [];
      this.area = [];
      this.myprod = [];
      this.prod = [];
      this.getFavoriteEvents();
      this.getFavoriteProduct();
      this.getMyProduct();
      this.getMyEvents();
      this.mysport = [];
      this.mytr = [];
      this.getMySport();
      this.getMyTraining();
    });
  }

  public getMyProduct(): void {
    this.userSubscribtion = this.auth.user.subscribe(data => {
      for (let mypr of data.myProducts) {
        this.eventService
          .getConvertedDocumentFromCollection(mypr, "products")
          .subscribe(data => {
            this.myprod.push(data);
          });
      }
    });
    console.log(this.myprod);
  }

  openAddProduct(): void {
    let dialogRef = this.dialog.open(AddProductDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.myevents = [];
      this.area = [];
      this.prod = [];
      this.getFavoriteEvents();
      this.getFavoriteProduct();
      this.getMyEvents();
      this.myprod = [];
      this.getMyProduct();
      this.mysport = [];
      this.mytr = [];
      this.getMySport();
      this.getMyTraining();
    });
  }
  public getMySport(): void {
    this.userSubscribtion = this.auth.user.subscribe(data => {
      for (let mypr of data.mySports) {
        this.eventService
          .getConvertedDocumentFromCollection(mypr, "sports")
          .subscribe(data => {
            this.mysport.push(data);
          });
      }
    });
  }
  openAddSport(): void {
    let dialogRef = this.dialog.open(AddSportDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.myevents = [];
      this.area = [];
      this.prod = [];
      this.getFavoriteEvents();
      this.getFavoriteProduct();
      this.getMyEvents();
      this.myprod = [];
      this.getMyProduct();
      this.mysport = [];
      this.mytr = [];
      this.getMySport();
      this.getMyTraining();
    });
  }
  public getMyTraining(): void {
    this.userSubscribtion = this.auth.user.subscribe(data => {
      for (let mypr of data.myTrainings) {
        this.eventService
          .getConvertedDocumentFromCollection(mypr, "trainings")
          .subscribe(data => {
            this.mytr.push(data);
          });
      }
    });
  }
  openAddTraining(): void {
    let dialogRef = this.dialog.open(AddTrainingDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.myevents = [];
      this.area = [];
      this.prod = [];
      this.getFavoriteEvents();
      this.getFavoriteProduct();
      this.getMyEvents();
      this.myprod = [];
      this.getMyProduct();
      this.mysport = [];
      this.mytr = [];
      this.getMySport();
      this.getMyTraining();
    });
  }
  public getFavoriteProduct(): void {
    this.userSubscribtion = this.auth.user.subscribe(data => {
      for (let favprod of data.favoriteProduct) {
        this.eventService
          .getConvertedDocumentFromCollection(favprod, "products")
          .subscribe(data => {
            this.prod.push(data);
          });
      }
    });
  }
  followEvents(item: any): void {
    //console.log(item);
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "events" }
    ]);
  }

  followProducts(item: any): void {
    //console.log(item);
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "products" }
    ]);
  }
  followMyProducts(item: any): void {
    //console.log(item);
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "shop" }
    ]);
  }
  followMyEvent(item: any): void {
    //console.log(item);
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "events" }
    ]);
  }
  followMyTraining(item: any): void {
    //console.log(item);
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "training" }
    ]);
  }
  followMySport(item: any): void {
    //console.log(item);
    this.router.navigate([
      "output-details",
      { uid: item.id, collection: "sport" }
    ]);
  }
  ngOnDestroy() {
    this.userSubscribtion.unsubscribe();
  }

  public getInfo(): void {
    this.userSubscribtion = this.auth.user.subscribe(
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
    let ref: MatDialogRef<ProductCreatorComponent> = this.dialog.open(
      ProductCreatorComponent
    );
    this.showSnackBar<ProductCreatorComponent>(ref);
  }

  public openEditProfile(): void {
    let ref: MatDialogRef<EditProfileComponent> = this.dialog.open(
      EditProfileComponent
    );
    this.showSnackBar<EditProfileComponent>(ref);
  }
}
