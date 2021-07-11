import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiDVListComponent } from './services-tpye-list.component';

describe('ServicesTpyeListComponent', () => {
  let component: LoaiDVListComponent;
  let fixture: ComponentFixture<LoaiDVListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiDVListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiDVListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
