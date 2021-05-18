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
  onScroll(document, event) {
    try {
      const top = document.documentElement.scrollTop;
      // const height = event.scrollHeight;
      // const offset = event.offsetHeight;
      // console.log('t', top);
      // console.log('h', height);
      // console.log('o', offset);
      // console.log(window.pageYOffset);

      // emit bottom event
      let pos =
        (document.documentElement.scrollTop || document.body.scrollTop) +
        document.documentElement.offsetHeight;
      if (
        document.documentElement.offsetHeight +
          document.documentElement.scrollTop >=
        document.documentElement.scrollHeight
      ) {
        return 'bottom';
      }

      // // emit top event
      if (top === 0) {
        return 'top';
      }
    } catch (err) {}
  }
}
