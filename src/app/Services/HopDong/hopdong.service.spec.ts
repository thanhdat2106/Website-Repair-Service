import { TestBed } from '@angular/core/testing';

import { HopdongService } from './hopdong.service';

describe('HopdongService', () => {
  let service: HopdongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HopdongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
