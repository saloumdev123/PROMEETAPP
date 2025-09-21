import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jardinageprocess } from './jardinageprocess';

describe('Jardinageprocess', () => {
  let component: Jardinageprocess;
  let fixture: ComponentFixture<Jardinageprocess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jardinageprocess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jardinageprocess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
