import { LightBoxDirective } from './light-box.directive';
import { ElementRef } from '@angular/core';

describe('LightBoxDirective', () => {
  let elementRefMock: ElementRef;

  beforeEach(() => {
    // Create a mock ElementRef object
    elementRefMock = new ElementRef(document.createElement('div'));
  });

  it('should create an instance', () => {
    const directive = new LightBoxDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});
