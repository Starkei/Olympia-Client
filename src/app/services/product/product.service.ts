import { Injectable } from "@angular/core";
import { Product } from "src/app/interfaces/models/product";
import { AngularFirestore } from "@angular/fire/firestore";
import * as _ from "lodash";
import { FilterService } from "src/app/engine/classes/filter-service/filter.service";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
/**
 *
 * @description execute method ngOnDestroy for reset filters
 * @export
 * @class ProductService
 * @extends {FilterService<Product>}
 */
@Injectable({
  providedIn: "root"
})
export class ProductService extends FilterService<Product> {
  constructor(afs: AngularFirestore) {
    super(afs, "products");
  }
}
