import { TestBed } from '@angular/core/testing';

import { BuyerServiceService } from './buyer-service.service';

describe('BuyerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyerServiceService = TestBed.get(BuyerServiceService);
    expect(service).toBeTruthy();
  });
});
