import { TestBed } from '@angular/core/testing';

import { BudgetDataService } from './budget-data.service';

describe('BudgeDataService', () => {
  let service: BudgetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
