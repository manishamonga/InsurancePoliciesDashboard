import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPolicyDetailsComponent } from './chart-policy-details.component';

describe('ChartPolicyDetailsComponent', () => {
  let component: ChartPolicyDetailsComponent;
  let fixture: ComponentFixture<ChartPolicyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPolicyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPolicyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
