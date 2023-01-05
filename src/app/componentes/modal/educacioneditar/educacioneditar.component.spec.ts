import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducacioneditarComponent } from './educacioneditar.component';

describe('EducacioneditarComponent', () => {
  let component: EducacioneditarComponent;
  let fixture: ComponentFixture<EducacioneditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducacioneditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducacioneditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
