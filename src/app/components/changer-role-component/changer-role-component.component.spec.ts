import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerRoleComponentComponent } from './changer-role-component.component';

describe('ChangerRoleComponentComponent', () => {
  let component: ChangerRoleComponentComponent;
  let fixture: ComponentFixture<ChangerRoleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangerRoleComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangerRoleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
