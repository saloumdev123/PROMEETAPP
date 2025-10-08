import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandePrestationComponent } from './commande-prestation-component';

describe('CommandePrestationComponent', () => {
  let component: CommandePrestationComponent;
  let fixture: ComponentFixture<CommandePrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandePrestationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandePrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
