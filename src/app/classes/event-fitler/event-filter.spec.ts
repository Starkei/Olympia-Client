import { EventFilter } from './event-filter';
import { EventService } from 'src/app/services/event/event.service';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

describe('EventFilter', () => {

  let serives: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [EventService]
    });
  })

  it('should create an instance', () => {
    serives = TestBed.get(EventService);
    expect(new EventFilter(serives)).toBeTruthy();
  });
});
