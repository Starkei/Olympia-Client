import { ShopFilter } from './shop-filter';
import { ProductService } from 'src/app/services/product/product.service';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';

describe('ShopFilter', () => {

  let serives: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [ProductService]
    });
  })


  it('should create an instance', () => {
    serives = TestBed.get(ProductService);
    expect(new ShopFilter(serives)).toBeTruthy();
  });
});
