import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionResultNotificatorPopUpComponent } from './action-result-notificator-pop-up.component';

describe('ActionResultNotificatorPopUpComponent', () => {
  let component: ActionResultNotificatorPopUpComponent;
  let fixture: ComponentFixture<ActionResultNotificatorPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionResultNotificatorPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionResultNotificatorPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
