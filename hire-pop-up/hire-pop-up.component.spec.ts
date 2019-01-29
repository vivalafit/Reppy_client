import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HirePopUpComponent } from './hire-pop-up.component';

describe('HirePopUpComponent', () => {
  let component: HirePopUpComponent;
  let fixture: ComponentFixture<HirePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HirePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
