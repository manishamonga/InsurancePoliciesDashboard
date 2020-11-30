import { TestBed } from '@angular/core/testing';

import { PoliciesDataAccessService } from './policies-data-access.service';

describe('PoliciesDataAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoliciesDataAccessService = TestBed.get(PoliciesDataAccessService);
    expect(service).toBeTruthy();
  });
});
