import { TestBed } from '@angular/core/testing';

import { KhachhangServicesService } from './khachhang-services.service';

describe('KhachhangServicesService', () => {
  let service: KhachhangServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhachhangServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
