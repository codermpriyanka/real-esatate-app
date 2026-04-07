import { TestBed } from '@angular/core/testing';

import { SignupSeviceService } from './signup-sevice.service';

describe('SignupSeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignupSeviceService = TestBed.get(SignupSeviceService);
    expect(service).toBeTruthy();
  });
});
