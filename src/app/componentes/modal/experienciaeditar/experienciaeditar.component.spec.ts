import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaeditarComponent } from './experienciaeditar.component';

describe('ExperienciaeditarComponent', () => {
  let component: ExperienciaeditarComponent;
  let fixture: ComponentFixture<ExperienciaeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperienciaeditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciaeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
