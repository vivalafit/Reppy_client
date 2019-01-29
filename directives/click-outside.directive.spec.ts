import { ClickOutsideDirective } from './click-outside.directive';
import {ElementRef} from '@angular/core';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    let elementRef : ElementRef;
    const directive = new ClickOutsideDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
