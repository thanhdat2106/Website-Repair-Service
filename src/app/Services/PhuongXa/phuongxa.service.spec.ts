import { TestBed } from '@angular/core/testing';

import { PhuongxaService } from './phuongxa.service';

describe('PhuongxaService', () => {
  let service: PhuongxaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhuongxaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
