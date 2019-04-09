import { TestBed } from '@angular/core/testing';

import { AdwareService } from './adware.service';

describe('AdwareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdwareService = TestBed.get(AdwareService);
    expect(service).toBeTruthy();
  });
});
