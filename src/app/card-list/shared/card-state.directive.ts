import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[tlCardState]'
})
export class CardStateDirective implements OnInit {

  @Input('tlCardState') date: Date;

  private readonly WARNING_STATE = '#dddbff';
  private readonly CRITICAL_STATE = '#ffc6c6';

  private readonly TODAY = new Date();
  private readonly DAY_IN_MSECS = 24 * 60 * 60 * 1000;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const dateDiff = Number(this.date) - Number(this.TODAY);

    if (dateDiff > 0 && dateDiff <= 3 * this.DAY_IN_MSECS) {
      this.setCardState(this.WARNING_STATE);
    } else if (dateDiff < 0) {
      this.setCardState(this.CRITICAL_STATE);
    }
  }

  private setCardState(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
