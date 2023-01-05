import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciaseliminarComponent } from './competenciaseliminar.component';

describe('CompetenciaseliminarComponent', () => {
  let component: CompetenciaseliminarComponent;
  let fixture: ComponentFixture<CompetenciaseliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenciaseliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetenciaseliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
