import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciasEditarComponent } from './competencias-editar.component';

describe('CompetenciasEditarComponent', () => {
  let component: CompetenciasEditarComponent;
  let fixture: ComponentFixture<CompetenciasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenciasEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetenciasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
