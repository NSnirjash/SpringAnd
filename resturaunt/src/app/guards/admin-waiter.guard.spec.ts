import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminWaiterGuard } from './admin-waiter.guard';

describe('adminWaiterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminWaiterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
