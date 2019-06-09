import { CrowdfundingFilter } from './crowdfunding-filter';
import { TestBed } from '@angular/core/testing';
import { CrowdfundingService } from 'src/app/services/crowdfunding/crowdfunding.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';

describe('CrowdfundingFilter', () => {

  let service: CrowdfundingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [CrowdfundingService]
    });
  })

  it('should create an instance', () => {
    service = TestBed.get(CrowdfundingService);
    expect(new CrowdfundingFilter(service)).toBeTruthy();
  });
});
