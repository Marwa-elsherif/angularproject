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
      // console.log(document.documentElement)

      const top = document.documentElement.scrollTop;

      const height = event.scrollHeight;

      const offset = event.offsetHeight;

      // console.log('scrollTop', top);

      // console.log('scrollHeight', height);

      // console.log('offsetHeight', offset);

      // console.log('pageYOffset',window.pageYOffset);

      // emit bottom event

      let scrollY = window.scrollY;

      let visible = document.documentElement.clientHeight;

      let pageHeight = document.documentElement.scrollHeight;

      let bottomOfPage = visible + scrollY === pageHeight;

      let bottomOfWindow = bottomOfPage || pageHeight < visible;

      if (bottomOfWindow) {
        console.log('Bottom!');

        return 'bottom';

        // this.getData(); // async call
      }

      // // emit top event

      if (top === 0) {
        return 'top';
      }
    } catch (err) {}
  }
}

// window.onscroll = () => {

//   let scrollY = window.scrollY;

//   let visible = document.documentElement.clientHeight;

//   let pageHeight = document.documentElement.scrollHeight;

//   let bottomOfPage = visible + scrollY === pageHeight;

//   let bottomOfWindow = bottomOfPage || pageHeight < visible;

//   if (bottomOfWindow) {

//     console.log('Bottom!');

//     // this.getData(); // async call

//   }

// };
