import { Injectable } from "@angular/core";
import { DataQueryService } from "src/app/engine/classes/data-query-service/data-query.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Product } from "src/app/interfaces/models/product";
import { map } from "rxjs/operators";
import { Adware } from "src/app/interfaces/models/adware";
import { ConvertedAdware } from "src/app/interfaces/converted-adware";
import { User } from "src/app/interfaces/auth";
import { FilterService } from "src/app/engine/classes/filter-service/filter.service";

@Injectable({
  providedIn: "root"
})
export class AdwareService extends FilterService<Product> {
  constructor(afs: AngularFirestore) {
    super(afs, "products");
  }

  public getRandomProductAware(): Observable<Product> {
    return this.getAllConvertedData().pipe(
      map(
        (products: Array<Product>): Product => {
          let index = Math.floor(Math.random() * products.length);
          return products[index];
        }
      )
    );
  }

  public async getConvertedAdware(adware: Adware): Promise<ConvertedAdware> {
    let convertedAdware: ConvertedAdware = {};

    convertedAdware.id = adware.id;
    this.getConvertedDocumentFromCollection<Product>(adware.productId, "products").subscribe(
      (data: Product): void => {
        convertedAdware.product = data;
      }
    );
    this.getConvertedDocumentFromCollection<User>(adware.productId, "products").subscribe(
      (data: User): void => {
        convertedAdware.user = data;
      }
    );
    return convertedAdware;
  }
}
