import { TestBed } from '@angular/core/testing';

import { DichvuServicesService } from './dichvu-services.service';

describe('DichvuServicesService', () => {
  let service: DichvuServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DichvuServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
