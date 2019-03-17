import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from "@angular/core";
import { Filter } from "src/app/interfaces/filter";
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints
} from "@angular/cdk/layout";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit {
  @Input() filter: Filter;
  @Output() shouldBeUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild("anchor") anchor: ElementRef;
  margin: number = 0;
  isMobile: boolean = false;
  style: any = {};
  constructor(
    private breakpointObserver: BreakpointObserver,
    private changeDetector: ChangeDetectorRef
  ) {
    this.style.position = "relative";
    this.style.top = "auto";
  }

  update() {
    this.shouldBeUpdate.emit(true);
  }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(
      (result: BreakpointState): void => {
        if (result.matches) this.isMobile = true;
      }
    );
  }

  setFixed(fixed: boolean): void {
    this.style.position = !this.isMobile && fixed ? "fixed" : "relative";
    this.style.top = !this.isMobile && fixed ? "71px" : "auto";
    if (fixed) {
      this.margin = 40;
      this.changeDetector.detectChanges();
    }
  }
}
