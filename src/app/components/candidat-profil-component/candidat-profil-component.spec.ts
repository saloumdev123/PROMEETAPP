import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatProfilComponent } from './candidat-profil-component';

describe('CandidatProfilComponent', () => {
  let component: CandidatProfilComponent;
  let fixture: ComponentFixture<CandidatProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
