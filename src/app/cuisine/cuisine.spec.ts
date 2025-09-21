import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cuisine } from './cuisine';

describe('Cuisine', () => {
  let component: Cuisine;
  let fixture: ComponentFixture<Cuisine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cuisine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cuisine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
