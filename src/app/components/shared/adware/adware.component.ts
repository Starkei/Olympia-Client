import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { AdwareService } from "src/app/services/adware/adware.service";
import { Observable } from "rxjs";
import { Output } from "src/app/interfaces/output";
import { ConvertedAdware } from "src/app/interfaces/converted-adware";
import { RouterLink, Route, Router } from "@angular/router";
import { Product } from 'src/app/interfaces/models/product';

@Component({
  selector: "app-adware",
  templateUrl: "./adware.component.html",
  styleUrls: ["./adware.component.scss"]
})
export class AdwareComponent implements OnInit {
  adware: Product;

  /**
   * @description Creates an instance of AdwareComponent.
   * @param {MatDialogRef<AdwareComponent>} ref
   * @memberof AdwareComponent
   */
  constructor(
    private router: Router,
    private ref: MatDialogRef<AdwareComponent>,
    private adwareService: AdwareService
  ) { }

  ngOnInit() {
    this.adwareService.getRandomProductAware().subscribe(
      data => this.adware = data
    );
  }

  public follow(): void {
    this.router.navigate(["output-details", { uid: this.adware.id, collection: "products" }]);
    this.close("Перенаправление");
  }
  public close(message: string = "Закрыто"): void {
    this.ref.close(message);
  }
}
