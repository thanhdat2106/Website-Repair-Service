import { TestBed } from '@angular/core/testing';

import { LoaidvServicesService } from './loaidv-services.service';

describe('LoaidvServicesService', () => {
  let service: LoaidvServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaidvServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
