import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Self,
  ElementRef
} from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Output } from "src/app/interfaces/output";
import { Observable } from "rxjs";
import { Filter } from "src/app/interfaces/filter";
import { Filterable } from "src/app/interfaces/filterable";
import { element } from "@angular/core/src/render3";

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

  items: Observable<Array<Output>>;
  private flexSize: number = 30;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.items = this.service.getFilteredData(this.filter);
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
        this.items = this.service.getFilteredData(this.filter);
      });
    }
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
}
