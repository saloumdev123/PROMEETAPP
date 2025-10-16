import { TestBed } from '@angular/core/testing';

import { AvoirService } from './avoir-service';

describe('AvoirService', () => {
  let service: AvoirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvoirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
