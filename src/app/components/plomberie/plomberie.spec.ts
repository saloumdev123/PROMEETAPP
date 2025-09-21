import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Plomberie } from './plomberie';

describe('Plomberie', () => {
  let component: Plomberie;
  let fixture: ComponentFixture<Plomberie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Plomberie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Plomberie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
