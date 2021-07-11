import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThosuaComponent } from './thosua.component';

describe('ThosuaComponent', () => {
  let component: ThosuaComponent;
  let fixture: ComponentFixture<ThosuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThosuaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThosuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
