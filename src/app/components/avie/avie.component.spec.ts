import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvieComponent } from './avie.component';

describe('AvieComponent', () => {
  let component: AvieComponent;
  let fixture: ComponentFixture<AvieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
