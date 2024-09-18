import { TestBed } from '@angular/core/testing';

import { TestParameterService } from './test-parameter.service';

describe('TestParameterService', () => {
  let service: TestParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
