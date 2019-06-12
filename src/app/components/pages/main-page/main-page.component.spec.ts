import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { BannerComponent } from '../../shared/banner/banner.component';
import { NewsComponent } from '../../shared/news-component/news/news.component';
import { OutputComponent } from '../../shared/output-component/output/output.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { OthersModule } from 'src/app/modules/others/others.module';
import { TextLengthPipe } from 'src/app/pipes/text-length/text-length.pipe';
import { ArrayFormatterPipe } from 'src/app/pipes/array-formatter/array-formatter.pipe';
import { NewsService } from 'src/app/services/news/news.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        OthersModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterTestingModule
      ],
      declarations: [
        MainPageComponent,
        BannerComponent,
        NewsComponent,
        OutputComponent,
        TextLengthPipe,
        ArrayFormatterPipe
      ],
      providers: [
        NewsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
