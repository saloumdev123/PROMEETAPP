import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Abonnement } from './abonnement';

describe('Abonnement', () => {
  let component: Abonnement;
  let fixture: ComponentFixture<Abonnement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Abonnement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Abonnement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
