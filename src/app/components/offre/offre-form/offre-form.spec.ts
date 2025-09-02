import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreForm } from './offre-form';

describe('OffreForm', () => {
  let component: OffreForm;
  let fixture: ComponentFixture<OffreForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffreForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
