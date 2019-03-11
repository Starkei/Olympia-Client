import { TestBed } from '@angular/core/testing';

import { PersonalAreaService } from './personal-area.service';

describe('PersonalAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonalAreaService = TestBed.get(PersonalAreaService);
    expect(service).toBeTruthy();
  });
});
