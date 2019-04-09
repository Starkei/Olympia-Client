import { TestBed } from '@angular/core/testing';

import { DataQueryService } from './data-query.service';

describe('DataQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataQueryService = TestBed.get(DataQueryService);
    expect(service).toBeTruthy();
  });
});
