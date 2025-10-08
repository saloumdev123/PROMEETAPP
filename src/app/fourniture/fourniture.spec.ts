import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fourniture } from './fourniture';

describe('Fourniture', () => {
  let component: Fourniture;
  let fixture: ComponentFixture<Fourniture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fourniture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fourniture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
