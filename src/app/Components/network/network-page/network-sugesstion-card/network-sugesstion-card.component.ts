import {
  Component,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
//import { userInfo } from 'node:os';
import { NetworkService } from '../../Services/network.service';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/MainServices/pagination.service';
import { ScrollableDirective } from 'src/app/MainDirectives/scrollable.directive';
import { DOCUMENT } from '@angular/common';
import { isLabeledStatement } from 'typescript';
@Component({
  selector: 'app-network-sugesstion-card',
  templateUrl: './network-sugesstion-card.component.html',
  styleUrls: ['./network-sugesstion-card.component.scss'],
})
export class NetworkSugesstionCardComponent implements OnInit {
  usersinCardData: any[];
  @ViewChildren(ScrollableDirective) dirs;
  @ViewChild('card') input;
  constructor(
    private usrs: NetworkService,
    private page: PaginationService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    let friendData: any[];
    let Requests: any[];
    let SentfriendRequest: any[];

    let uid = localStorage.getItem('uid');
    this.usrs.getAllFriendRequests(uid).subscribe((data) => {
      Requests = data.map((e) => {
        return e.payload.doc.id;
      });

      this.usrs.getAllFriendsList(uid).subscribe((data) => {
        friendData = data.map((e) => {
          return e.payload.doc.id;
        });

        this.usrs.getMySentfriendRequests(uid).subscribe((data) => {
          SentfriendRequest = data.map((e) => {
            return e.payload.doc.id;
          });

          this.page.init(
            'users-details',
            '__name__',
            {
              limit: 1,
              reverse: false,
              prepend: true,
            },
            '__name__',
            Requests.concat(friendData, SentfriendRequest, uid),
            'not-in'
          );

          this.page.data.subscribe((res) => {
            this.usersinCardData = res.map((e) => {
              // console.log();

              return {
                id: e.id,
                firstName: e.firstName,
                lastName: e.lastName,
                jobTitle: e.jobTitle,
                avatar: e.avatar,
                avatarCover: e.avatarCover,
              };
            });
          });

          // this.usrs
          //   .notINCard(, uid)
          //   .subscribe((data) => {
          //     this.usersinCardData = data.map((e) => {
          //       return {
          //         id: e.payload.doc.id,
          //         firstName:
          //           e.payload.doc.data()['firstName'] +
          //           ' ' +
          //           e.payload.doc.data()['lastName'],
          //         jobTitle: e.payload.doc.data()['jobTitle'],
          //         avatar: e.payload.doc.data()['avatar'],
          //         avatarCover: e.payload.doc.data()['avatarCover'],
          //       };
          //     });
          //   });
        });
      });
    });
  }
  @HostListener('window:scroll', []) onScrolll() {
    try {
      // let e = this.dirs.first.onScrolll(this.document.documentElement);
      let e = this.dirs.first.onScroll(this.document, this.input.nativeElement);
      console.log(e);
      if (e === 'bottom') {
        this.page.more();
      }
    } catch (err) {}
  }

  sendRequest(id) {
    this.usrs.create_NewRequest(id, {
      id: localStorage.getItem('uid'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      avatar: localStorage.getItem('avatar'),
      avatarCover: localStorage.getItem('avatarCover'),
      jobTitle: localStorage.getItem('jobTitle'),
    });
  }
}
