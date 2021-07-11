import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoithoComponent } from './goitho.component';

describe('GoithoComponent', () => {
  let component: GoithoComponent;
  let fixture: ComponentFixture<GoithoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoithoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoithoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
