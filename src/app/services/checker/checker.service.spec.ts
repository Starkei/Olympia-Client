import { TestBed } from '@angular/core/testing';

import { CheckerService } from './checker.service';

describe('CheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckerService = TestBed.get(CheckerService);
    expect(service).toBeTruthy();
  });
});
