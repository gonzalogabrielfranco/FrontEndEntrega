import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaeliminarComponent } from './personaeliminar.component';

describe('PersonaeliminarComponent', () => {
  let component: PersonaeliminarComponent;
  let fixture: ComponentFixture<PersonaeliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaeliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaeliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
