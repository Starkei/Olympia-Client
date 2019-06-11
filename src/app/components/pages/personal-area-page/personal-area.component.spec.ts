import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAreaComponent } from './personal-area.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth/Auth.service';
import { BannerComponent } from '../../shared/banner/banner.component';
import { OthersModule } from 'src/app/modules/others/others.module';

describe('PersonalAreaComponent', () => {
  let component: PersonalAreaComponent;
  let fixture: ComponentFixture<PersonalAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        OthersModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      declarations: [
        PersonalAreaComponent,
        BannerComponent
      ],
      providers: [
        AuthService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
