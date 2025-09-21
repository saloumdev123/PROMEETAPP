import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jardinage } from './jardinage';

describe('Jardinage', () => {
  let component: Jardinage;
  let fixture: ComponentFixture<Jardinage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jardinage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jardinage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
