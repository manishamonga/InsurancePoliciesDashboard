import { TestBed } from '@angular/core/testing';

import { PolicyChartDetailsService } from './policy-chart-details.service';

describe('PolicyChartDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolicyChartDetailsService = TestBed.get(PolicyChartDetailsService);
    expect(service).toBeTruthy();
  });
});
