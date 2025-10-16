import { TestBed } from '@angular/core/testing';

import { PdfGeneratorServiceAvoir } from './pdf-generator-service-avoir';

describe('PdfGeneratorServiceAvoir', () => {
  let service: PdfGeneratorServiceAvoir;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfGeneratorServiceAvoir);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
