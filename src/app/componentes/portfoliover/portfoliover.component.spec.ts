import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioverComponent } from './portfoliover.component';

describe('PortfolioverComponent', () => {
  let component: PortfolioverComponent;
  let fixture: ComponentFixture<PortfolioverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
