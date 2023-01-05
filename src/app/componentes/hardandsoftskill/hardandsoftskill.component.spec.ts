import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardandsoftskillComponent } from './hardandsoftskill.component';

describe('HardandsoftskillComponent', () => {
  let component: HardandsoftskillComponent;
  let fixture: ComponentFixture<HardandsoftskillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardandsoftskillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardandsoftskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
