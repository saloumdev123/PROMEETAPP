import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloppeurDashboard } from './developpeur-dashboard';

describe('DeveloppeurDashboard', () => {
  let component: DeveloppeurDashboard;
  let fixture: ComponentFixture<DeveloppeurDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloppeurDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloppeurDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
