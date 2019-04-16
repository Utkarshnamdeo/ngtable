import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[autofocus]'
})
export class AutofocusDirective implements AfterContentInit {
  // tslint:disable-next-line: no-input-rename
  @Input('focus') focus: boolean;

  public constructor(private el: ElementRef) {}

  public ngAfterContentInit() {
    if (this.focus) {
      setTimeout(() => {
        this.el.nativeElement.focus();
        this.el.nativeElement.select();
      }, 0);
    }
  }
}
