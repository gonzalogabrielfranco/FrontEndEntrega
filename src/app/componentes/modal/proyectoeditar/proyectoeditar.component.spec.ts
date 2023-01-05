import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoeditarComponent } from './proyectoeditar.component';

describe('ProyectoeditarComponent', () => {
  let component: ProyectoeditarComponent;
  let fixture: ComponentFixture<ProyectoeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoeditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
