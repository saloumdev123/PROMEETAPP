import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneDeviseComponent } from './ligne-devise-component';

describe('LigneDeviseComponent', () => {
  let component: LigneDeviseComponent;
  let fixture: ComponentFixture<LigneDeviseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigneDeviseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigneDeviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
