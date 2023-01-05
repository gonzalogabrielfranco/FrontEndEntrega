import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercadeeditarComponent } from './acercadeeditar.component';

describe('AcercadeeditarComponent', () => {
  let component: AcercadeeditarComponent;
  let fixture: ComponentFixture<AcercadeeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcercadeeditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcercadeeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
