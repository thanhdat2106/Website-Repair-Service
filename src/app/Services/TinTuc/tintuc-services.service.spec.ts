import { TestBed } from '@angular/core/testing';

import { TintucServicesService } from './tintuc-services.service';

describe('TintucServicesService', () => {
  let service: TintucServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TintucServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
