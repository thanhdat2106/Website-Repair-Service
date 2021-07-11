import { TestBed } from '@angular/core/testing';

import { ThosuaServicesService } from './thosua-services.service';

describe('ThosuaServicesService', () => {
  let service: ThosuaServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThosuaServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
