import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingComponent } from './training.component';
import { TrainingService } from 'src/app/services/training/training.service';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { OthersModule } from 'src/app/modules/others/others.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BannerComponent } from '../../shared/banner/banner.component';
import { OutputComponent } from '../../shared/output-component/output/output.component';
import { FilterComponent } from '../../shared/filter-component/filter/filter.component';
import { FieldComponent } from '../../shared/filter-component/field/field.component';
import { ScrollingDirective } from 'src/app/directives/scrolling/scrolling.directive';
import { TextLengthPipe } from 'src/app/pipes/text-length/text-length.pipe';
import { ArrayFormatterPipe } from 'src/app/pipes/array-formatter/array-formatter.pipe';

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        OthersModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        TrainingComponent,
        BannerComponent,
        OutputComponent,
        FilterComponent,
        FieldComponent,
        ScrollingDirective,
        TextLengthPipe,
        ArrayFormatterPipe
      ],
      providers: [
        TrainingService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
