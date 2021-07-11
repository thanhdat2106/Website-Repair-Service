import { TestBed } from '@angular/core/testing';

import { QuanHuyenService } from './quan-huyen.service';

describe('QuanHuyenService', () => {
  let service: QuanHuyenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanHuyenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
