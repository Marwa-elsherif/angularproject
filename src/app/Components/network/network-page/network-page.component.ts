import { Component, OnInit } from '@angular/core';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/MainServices/pagination.service';


@Component({
  selector: 'app-network-page',
  templateUrl: './network-page.component.html',
  styleUrls: ['./network-page.component.scss']
})
export class NetworkPageComponent implements OnInit {

  constructor( private page:PaginationService) { }

  ngOnInit(): void {
    this.page.init('users-details', 'firstName', { reverse: true, prepend: false })
  }
  scrollHandler(e) {
    console.log(e)
    if (e === 'bottom') {
      this.page.more()
    }
  }
}
