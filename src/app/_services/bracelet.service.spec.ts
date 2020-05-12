import { TestBed } from '@angular/core/testing';

import { BraceletService } from './bracelet.service';

describe('BraceletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BraceletService = TestBed.get(BraceletService);
    expect(service).toBeTruthy();
  });
});
