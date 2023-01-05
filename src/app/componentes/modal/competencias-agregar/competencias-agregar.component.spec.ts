import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciasAgregarComponent } from './competencias-agregar.component';

describe('CompetenciasAgregarComponent', () => {
  let component: CompetenciasAgregarComponent;
  let fixture: ComponentFixture<CompetenciasAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenciasAgregarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetenciasAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
