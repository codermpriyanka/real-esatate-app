import { TestBed } from '@angular/core/testing';

import { CheckMessageServiceService } from './check-message-service.service';

describe('CheckMessageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckMessageServiceService = TestBed.get(CheckMessageServiceService);
    expect(service).toBeTruthy();
  });
});
