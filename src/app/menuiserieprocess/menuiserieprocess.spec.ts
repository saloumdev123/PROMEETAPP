import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menuiserieprocess } from './menuiserieprocess';

describe('Menuiserieprocess', () => {
  let component: Menuiserieprocess;
  let fixture: ComponentFixture<Menuiserieprocess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menuiserieprocess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Menuiserieprocess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
