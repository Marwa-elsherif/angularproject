import {
  Directive,
  HostListener,
  EventEmitter,
  Output,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[Scrollable]',
})
export class ScrollableDirective {
  @Output() scrollPosition = new EventEmitter();

  constructor(public el: ElementRef) {}
  onScroll($eventw, event) {
    try {
      const top = $eventw.scrollTop;
      const height = event.scrollHeight;
      const offset = event.offsetHeight;
      console.log('t', top);
      console.log('h', height);
      console.log('o', offset);
      console.log(window.pageYOffset);

      // emit bottom event
      if (top > offset / 6) {
        return 'bottom';
      }

      // // emit top event
      if (top === 0) {
        return 'top';
      }
    } catch (err) {}
  }
}
