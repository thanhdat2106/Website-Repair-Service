import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanggiadetailComponent } from './banggiadetail.component';

describe('BanggiadetailComponent', () => {
  let component: BanggiadetailComponent;
  let fixture: ComponentFixture<BanggiadetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanggiadetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanggiadetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
