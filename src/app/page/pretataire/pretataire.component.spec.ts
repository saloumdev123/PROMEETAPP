import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PretataireComponent } from './pretataire.component';

describe('PretataireComponent', () => {
  let component: PretataireComponent;
  let fixture: ComponentFixture<PretataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PretataireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PretataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
