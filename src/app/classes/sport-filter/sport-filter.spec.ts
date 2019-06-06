import { SportFilter } from './sport-filter';
import { SportService } from 'src/app/services/sport/sport.service';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';

describe('SportFilter', () => {

  let serives: SportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [SportService]
    });
  })

  it('should create an instance', () => {
    serives = TestBed.get(SportService);
    expect(new SportFilter(serives)).toBeTruthy();
  });
});
