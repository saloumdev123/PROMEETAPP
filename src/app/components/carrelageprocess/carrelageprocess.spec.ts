import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carrelageprocess } from './carrelageprocess';

describe('Carrelageprocess', () => {
  let component: Carrelageprocess;
  let fixture: ComponentFixture<Carrelageprocess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carrelageprocess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carrelageprocess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
