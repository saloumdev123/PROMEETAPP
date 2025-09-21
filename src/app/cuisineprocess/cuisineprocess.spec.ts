import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cuisineprocess } from './cuisineprocess';

describe('Cuisineprocess', () => {
  let component: Cuisineprocess;
  let fixture: ComponentFixture<Cuisineprocess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cuisineprocess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cuisineprocess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
