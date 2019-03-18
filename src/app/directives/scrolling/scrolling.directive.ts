import {
  Directive,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnDestroy
} from "@angular/core";

@Directive({
  selector: "[scrolling]"
})
export class ScrollingDirective implements OnDestroy {
  @Input() isShouldBeFixed: boolean = false;
  @Input() fixedOnPositionY: number = 0;
  @Input() fixedOnPositionYBottom: number = 0;
  @Input() anchor: ElementRef;

  @Output()
  fixed: EventEmitter<boolean> = new EventEmitter();

  constructor(private elRef: ElementRef) {
    window.addEventListener("scroll", this.onWindowScroll.bind(this), true);
    this.fixed = new EventEmitter();
  }

  sendFixed(elRef: ElementRef) {
    if (
      this.isShouldBeFixed &&
      elRef.nativeElement.getBoundingClientRect().y < this.fixedOnPositionY
    ) {
      this.fixed.emit(true);
    } else this.fixed.emit(false);
  }

  onWindowScroll(): void {
    if (this.anchor) this.sendFixed(this.anchor);
    else this.sendFixed(this.elRef);
  }

  ngOnDestroy() {
    window.removeEventListener("scroll", this.onWindowScroll.bind(this), true);
  }
}
