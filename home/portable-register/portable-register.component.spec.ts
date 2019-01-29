import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortableRegisterComponent } from './portable-register.component';

describe('PortableRegisterComponent', () => {
  let component: PortableRegisterComponent;
  let fixture: ComponentFixture<PortableRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortableRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortableRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
