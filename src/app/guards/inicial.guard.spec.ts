import { TestBed, async, inject } from '@angular/core/testing';

import { InicialGuard } from './inicial.guard';

describe('InicialGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InicialGuard]
    });
  });

  it('should ...', inject([InicialGuard], (guard: InicialGuard) => {
    expect(guard).toBeTruthy();
  }));
});
