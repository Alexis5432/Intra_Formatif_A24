import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { question1Guard } from './question1.guard';

describe('question1Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => question1Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
