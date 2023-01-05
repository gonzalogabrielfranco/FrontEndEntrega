import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedessocialeseliminarComponent } from './redessocialeseliminar.component';

describe('RedessocialeseliminarComponent', () => {
  let component: RedessocialeseliminarComponent;
  let fixture: ComponentFixture<RedessocialeseliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedessocialeseliminarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedessocialeseliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
