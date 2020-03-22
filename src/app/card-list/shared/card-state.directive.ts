import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[tlCardState]'
})
export class CardStateDirective implements OnInit {

  @Input('tlCardState') date: Date;

  private readonly WARNING_STATE = '#ffcc7b';
  private readonly CRITICAL_STATE = '#ff8080';

  private readonly TODAY = new Date();
  private readonly DAY_IN_MSECS = 24 * 60 * 60 * 1000;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    console.log(this.date);
    const dateDiff = Number(this.TODAY) - Number(this.date);
    if (dateDiff > 0 ) {
      if (dateDiff <= 3 * this.DAY_IN_MSECS) {
        this.setCardState(this.WARNING_STATE);
      } else {
        this.setCardState(this.CRITICAL_STATE);
      }
    }
  }

  private setCardState(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
