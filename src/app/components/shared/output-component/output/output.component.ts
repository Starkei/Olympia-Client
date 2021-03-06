import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Output } from "src/app/interfaces/output";
import { Observable } from "rxjs";
import { Filter } from "src/app/engine/interfaces/filter";
import { Filterable } from "src/app/engine/interfaces/filterable";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/Auth.service";
import { PageEvent, MatSnackBar } from "@angular/material";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { User } from "src/app/interfaces/auth";
import { Subscription } from "rxjs";
@Component({
  selector: "app-output",
  templateUrl: "./output.component.html",
  styleUrls: ["./output.component.scss"]
})
export class OutputComponent implements OnInit {
  @Input() service: Filterable;
  @Input() filter: Filter;
  @Input() update: EventEmitter<boolean>;
  @Input() showDescription: boolean = true;
  @Input() showAddress: boolean = false;
  @Input() showPhoneNumbers: boolean = false;
  @Input() showUnderground: boolean = false;
  @Input() btnFollow: boolean = false;
  @Input() btnLike: boolean = false;
  @Input() collection: string = "";
  @Input() eventLike: boolean = false;
  @Input() productLike: boolean = false;
  items: Observable<Array<Output>>;
  itemsCount: number = 0;
  itemsPerPage: number = 9;

  currentPageIndex: number = 0;
  private flexSize: number = 30;
  user: User;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private afs: AngularFirestore,
    public auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.service.getFilteredData(this.filter).subscribe(
      (itemsData: Array<Output>): void => {
        this.itemsCount = itemsData.length;
      }
    );
    this.assignItems();
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(
        (result: BreakpointState): void => {
          if (result.breakpoints[Breakpoints.Medium]) {
            this.flexSize = 45;
          }
        }
      );
    this.breakpointObserver.observe(["(max-width: 1010px)"]).subscribe(
      (result: BreakpointState): void => {
        if (result.matches) this.flexSize = 100;
      }
    );

    if (this.update) {
      this.update.subscribe(() => {
        this.assignItems();
      });
    }

    if (!this.filter)
      this.items = this.service.getPaginationData(
        this.filter,
        0,
        this.itemsPerPage
      );
  }

  assignItems(): void {
    let startAt: number = this.currentPageIndex * this.itemsPerPage;
    this.items = this.service.getFilteredData(
      this.filter,
      startAt,
      this.itemsPerPage
    );
  }

  showArrayWithCommas(array: Array<any>): string {
    let str: string = "";
    array.forEach(
      (value: any): void => {
        str = str.concat(value + ", ");
      }
    );
    str = str.substring(0, str.length - 2);
    return str;
  }

  getFormattedFlexSize(): string {
    return this.flexSize + "%";
  }

  follow(output: Output): void {
    this.router.navigate([
      "output-details",
      { uid: output.id, collection: this.collection }
    ]);
  }
  addFavEvent(output: Output): void {
    let uid: string;
    let add = false;
    let info = this.auth.infoAboutCurrentUser().subscribe(data => {
      if (data) {
        uid = data.uid;

        if (!data["favoritesEvents"]) data["favoritesEvents"] = [];
        for (let item of data.favoritesEvents) {
          if (output.id == item) {
            add = true;
            this.snackBar.open("У вас уже есть такое событие ", "Ок", {
              duration: 2000
            });
          }
        }
        if (add == false) {
          data.favoritesEvents.push(output.id);
          this.user = data;
          this.auth.updateDocument(this.user, uid);

          info.unsubscribe();
        }
      } else {
        this.snackBar.open("Вы не авторизованны ", "Ок", {
          duration: 2000
        });
      }
      info.unsubscribe();
    });
  }
  addFavProduct(output: Output): void {
    let uid: string;
    let add = false;
    let info = this.auth.infoAboutCurrentUser().subscribe(data => {
      if (data) {
        uid = data.uid;

        if (!data["favoriteProduct"]) data["favoriteProduct"] = [];
        for (let item of data.favoriteProduct) {
          if (output.id == item) {
            add = true;
            this.snackBar.open("У вас уже есть такой продукт ", "Ок", {
              duration: 2000
            });
          }
        }
        if (add == false) {
          data.favoriteProduct.push(output.id);
          this.user = data;
          this.auth.updateDocument(this.user, uid);

          info.unsubscribe();
        }
      } else {
        this.snackBar.open("Вы не авторизованны ", "Ок", {
          duration: 2000
        });
      }
      info.unsubscribe();
    });
  }
  onPageChange(event: PageEvent): void {
    let startAt: number = event.pageIndex * event.pageSize;
    this.currentPageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    if (!this.filter) {
      this.items = this.service.getPaginationData(
        this.filter,
        startAt,
        this.itemsPerPage
      );
    } else {
      this.items = this.service.getFilteredData(
        this.filter,
        startAt,
        this.itemsPerPage
      );
    }
  }
}
