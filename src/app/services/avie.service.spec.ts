import { TestBed } from '@angular/core/testing';

import { AvieService } from './avie.service';

describe('AvieService', () => {
  let service: AvieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
