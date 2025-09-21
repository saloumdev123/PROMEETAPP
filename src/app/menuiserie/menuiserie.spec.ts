import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menuiserie } from './menuiserie';

describe('Menuiserie', () => {
  let component: Menuiserie;
  let fixture: ComponentFixture<Menuiserie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menuiserie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Menuiserie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
