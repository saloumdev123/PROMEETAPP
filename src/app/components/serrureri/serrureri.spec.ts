import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Serrureri } from './serrureri';

describe('Serrureri', () => {
  let component: Serrureri;
  let fixture: ComponentFixture<Serrureri>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Serrureri]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Serrureri);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
