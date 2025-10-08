import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierPrestationComponent } from './panier-prestation-component';

describe('PanierPrestationComponent', () => {
  let component: PanierPrestationComponent;
  let fixture: ComponentFixture<PanierPrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierPrestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
