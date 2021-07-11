import { TestBed } from '@angular/core/testing';
import { ThoDichvuService } from './tho-dichvu.service';



describe('ThoDichvuService', () => {
  let service: ThoDichvuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThoDichvuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
