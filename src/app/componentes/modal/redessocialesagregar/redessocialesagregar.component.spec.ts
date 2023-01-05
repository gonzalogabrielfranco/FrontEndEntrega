import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedessocialesagregarComponent } from './redessocialesagregar.component';

describe('RedessocialesagregarComponent', () => {
  let component: RedessocialesagregarComponent;
  let fixture: ComponentFixture<RedessocialesagregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedessocialesagregarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedessocialesagregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
