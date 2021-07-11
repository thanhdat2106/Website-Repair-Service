import { TestBed } from '@angular/core/testing';

import { NhanvienServicesService } from './nhanvien-services.service';

describe('NhanvienServicesService', () => {
  let service: NhanvienServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhanvienServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
