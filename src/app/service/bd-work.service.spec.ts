import { TestBed } from '@angular/core/testing';

import { BdWorkService } from './bd-work.service';

describe('BdWorkService', () => {
  let service: BdWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
