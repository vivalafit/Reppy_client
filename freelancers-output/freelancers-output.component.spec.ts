import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancersOutputComponent } from './freelancers-output.component';

describe('FreelancersOutputComponent', () => {
  let component: FreelancersOutputComponent;
  let fixture: ComponentFixture<FreelancersOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancersOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancersOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
