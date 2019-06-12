import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelComponent } from './admin-panel.component';
import { BannerComponent } from '../../shared/banner/banner.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { PostFormComponent } from '../../shared/admin-panel-component/post-form/post-form.component';
import { TableComponent } from '../../shared/admin-panel-component/table/table.component';
import { FieldComponent } from '../../shared/filter-component/field/field.component';
import { TextLengthPipe } from 'src/app/pipes/text-length/text-length.pipe';
import { ArrayFormatterPipe } from 'src/app/pipes/array-formatter/array-formatter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { AdwareService } from 'src/app/services/adware/adware.service';
import { ProductService } from 'src/app/services/product/product.service';
import { SportService } from 'src/app/services/sport/sport.service';
import { AuthService } from 'src/app/services/auth/Auth.service';
import { CrowdfundingService } from 'src/app/services/crowdfunding/crowdfunding.service';
import { EventService } from 'src/app/services/event/event.service';
import { TrainingService } from 'src/app/services/training/training.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorage } from '@angular/fire/storage';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AdminPanelComponent,
        BannerComponent,
        PostFormComponent,
        TableComponent,
        TextLengthPipe,
        ArrayFormatterPipe,
        FieldComponent
      ],
      providers: [
        AdwareService,
        ProductService,
        SportService,
        AuthService,
        CrowdfundingService,
        EventService,
        TrainingService,
        AngularFireStorage
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
