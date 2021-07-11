import { TestBed } from '@angular/core/testing';

import { GoithoService } from './goitho.service';

describe('GoithoService', () => {
  let service: GoithoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoithoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
