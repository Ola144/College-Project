import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { collegeProjectGuard } from './college-project.guard';

describe('collegeProjectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => collegeProjectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
