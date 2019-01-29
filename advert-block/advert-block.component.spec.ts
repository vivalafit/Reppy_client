import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertBlockComponent } from './advert-block.component';

describe('AdvertBlockComponent', () => {
  let component: AdvertBlockComponent;
  let fixture: ComponentFixture<AdvertBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
