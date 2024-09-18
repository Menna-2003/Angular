import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[LightBox]',
})
export class LightBoxDirective implements OnChanges {
  @Input('LightBox') borderRadius: string = '10px';

  constructor(private elementRef: ElementRef) {
    // elementRef.nativeElement.style.border="5px solid darkblue";
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.elementRef.nativeElement.style.borderRadius='10px'; 
  }

  @HostListener('mouseover') onMouseOver() {
    this.elementRef.nativeElement.style.borderRadius = this.borderRadius;
    this.elementRef.nativeElement.style
  }
  @HostListener('mouseout') onMouseOut() {
    this.elementRef.nativeElement.style.borderRadius = '10px';
  }
}
