import { TestBed } from '@angular/core/testing';

import { HardsoftskillService } from './hardsoftskill.service';

describe('HardsoftskillService', () => {
  let service: HardsoftskillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardsoftskillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
