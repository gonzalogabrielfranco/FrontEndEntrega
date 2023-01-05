import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioeditarComponent } from './portfolioeditar.component';

describe('PortfolioeditarComponent', () => {
  let component: PortfolioeditarComponent;
  let fixture: ComponentFixture<PortfolioeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioeditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
