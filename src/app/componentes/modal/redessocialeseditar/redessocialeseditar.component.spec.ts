import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedessocialeseditarComponent } from './redessocialeseditar.component';

describe('RedessocialeseditarComponent', () => {
  let component: RedessocialeseditarComponent;
  let fixture: ComponentFixture<RedessocialeseditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedessocialeseditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedessocialeseditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
