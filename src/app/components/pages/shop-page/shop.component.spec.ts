import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopComponent } from './shop.component';
import { BannerComponent } from '../../shared/banner/banner.component';
import { FilterComponent } from '../../shared/filter-component/filter/filter.component';
import { OutputComponent } from '../../shared/output-component/output/output.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ScrollingDirective } from 'src/app/directives/scrolling/scrolling.directive';
import { FieldComponent } from '../../shared/filter-component/field/field.component';
import { OthersModule } from 'src/app/modules/others/others.module';
import { TextLengthPipe } from 'src/app/pipes/text-length/text-length.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        OthersModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterTestingModule
      ],
      declarations: [
        ShopComponent,
        BannerComponent,
        FilterComponent,
        OutputComponent,
        FieldComponent,
        ScrollingDirective,
        TextLengthPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
