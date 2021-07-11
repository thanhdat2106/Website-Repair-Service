import { TestBed } from '@angular/core/testing';

import { BanggiaService } from './banggia.service';

describe('BanggiaService', () => {
  let service: BanggiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanggiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
