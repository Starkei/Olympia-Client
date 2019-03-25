import { Injectable } from "@angular/core";
import { Product } from "src/app/interfaces/models/product";
import { AngularFirestore } from "@angular/fire/firestore";
import * as _ from "lodash";
import { FilterService } from "../engine/filter-service/filter.service";
@Injectable({
  providedIn: "root"
})
export class ProductService extends FilterService<Product> {
  constructor(afs: AngularFirestore) {
    super(afs, "products");
  }
}
