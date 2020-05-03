import { TestBed } from '@angular/core/testing';

import { LocationHistoryService } from './location-history.service';

describe('LocationHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationHistoryService = TestBed.get(LocationHistoryService);
    expect(service).toBeTruthy();
  });
});
