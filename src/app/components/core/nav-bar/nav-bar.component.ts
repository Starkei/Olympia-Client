import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, BreakpointState, Breakpoints } from "@angular/cdk/layout";
import { AuthService } from "src/app/services/auth/Auth.service";
import { Observable } from "rxjs";
import { User } from "src/app/interfaces/auth";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  user: Observable<User>;

  constructor(private breakpointObserver: BreakpointObserver, public userService: AuthService) {}

  isLandscape: boolean = true;

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe((result: BreakpointState) => {
        if (result.breakpoints[Breakpoints.HandsetLandscape]) {
          this.isLandscape = true;
          if (this.breakpointObserver.isMatched("(max-width: 1000px)")) {
            this.isLandscape = false;
          }
        }
        if (result.breakpoints[Breakpoints.HandsetPortrait]) {
          this.isLandscape = false;
        }
      });

    this.user = this.userService.user;
  }
}
