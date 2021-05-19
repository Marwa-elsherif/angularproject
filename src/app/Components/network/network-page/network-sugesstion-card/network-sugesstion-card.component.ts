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
import { UserService } from 'src/app/MainServices/User.service';
@Component({
  selector: 'app-network-sugesstion-card',
  templateUrl: './network-sugesstion-card.component.html',
  styleUrls: ['./network-sugesstion-card.component.scss'],
})
export class NetworkSugesstionCardComponent implements OnInit {
  usersinCardData: any[] = [];
  @ViewChildren(ScrollableDirective) dirs;
  @ViewChild('card') input;
  friendData: any[];
  Requests: any[];
  SentfriendRequest: any[] = [];
  uid;
  constructor(
    private usrs: NetworkService,
    private page: PaginationService,
    private us: UserService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.uid = localStorage.getItem('uid');
    this.usrs.getAllFriendRequests(this.uid).subscribe((data) => {
      this.Requests = data.map((e) => {
        return e.payload.doc.id;
      });

      this.usrs.getAllFriendsList(this.uid).subscribe((data) => {
        this.friendData = data.map((e) => {
          return e.payload.doc.id;
        });

        this.usrs.getMySentfriendRequests(this.uid).subscribe((data) => {
          this.SentfriendRequest = data.map((e) => {
            return e.payload.doc.id;
          });

          // this.page.init(
          //   'users-details',
          //   '__name__',
          //   {
          //     limit: 2,
          //     reverse: false,
          //     prepend: true,
          //   },
          //   '__name__',
          //   Requests.concat(friendData, SentfriendRequest, uid),
          //   'not-in'
          // );

          // this.page.data.subscribe((res) => {
          //   console.log(res);

          //   this.usersinCardData = res.map((e) => {
          //     // console.log();

          //     return {
          //       id: e.id,
          //       firstName: e.firstName,
          //       lastName: e.lastName,
          //       jobTitle: e.jobTitle,
          //       avatar: e.avatar,
          //       avatarCover: e.avatarCover,
          //     };
          //   });
          // });

          this.usrs
            .notINCard(
              this.Requests.concat(
                this.friendData,
                this.SentfriendRequest,
                this.uid
              )
            )
            .subscribe((data) => {
              console.log('1');

              let flag = false;
              data.map((e) => {
                console.log(this.usersinCardData);

                this.usersinCardData.find((s) => {
                  if (s.id == e.payload.doc.id) {
                    flag = true;
                    s.id = e.payload.doc.id;
                    s.firstName = e.payload.doc.data()['firstName'];
                    s.lastName = e.payload.doc.data()['lastName'];
                    s.jobTitle = e.payload.doc.data()['jobTitle'];
                    s.avatar = e.payload.doc.data()['avatar'];
                    s.avatarCover = e.payload.doc.data()['avatarCover'];
                    s.doc = e.payload.doc;
                  }
                });
                if (!flag)
                  this.usersinCardData.push({
                    id: e.payload.doc.id,
                    firstName: e.payload.doc.data()['firstName'],
                    lastName: e.payload.doc.data()['lastName'],
                    jobTitle: e.payload.doc.data()['jobTitle'],
                    avatar: e.payload.doc.data()['avatar'],
                    avatarCover: e.payload.doc.data()['avatarCover'],
                    doc: e.payload.doc,
                  });
              });
            });
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
        let doc = this.usersinCardData[this.usersinCardData.length - 1].doc;
        console.log(doc);

        let sub = this.usrs
          .notINCard(
            this.Requests.concat(
              this.friendData,
              this.SentfriendRequest,
              this.uid
            ),
            doc
          )
          .subscribe((data) => {
            console.log('2');
            sub.unsubscribe();
            let flag = false;
            data.map((e) => {
              this.usersinCardData.find((s) => {
                if (s.id == e.payload.doc.id) {
                  flag = true;
                  s.id = e.payload.doc.id;
                  s.firstName = e.payload.doc.data()['firstName'];
                  s.lastName = e.payload.doc.data()['lastName'];
                  s.jobTitle = e.payload.doc.data()['jobTitle'];
                  s.avatar = e.payload.doc.data()['avatar'];
                  s.avatarCover = e.payload.doc.data()['avatarCover'];
                  s.doc = e.payload.doc;
                }
              });
              if (!flag)
                this.usersinCardData.push({
                  id: e.payload.doc.id,
                  firstName: e.payload.doc.data()['firstName'],
                  lastName: e.payload.doc.data()['lastName'],
                  jobTitle: e.payload.doc.data()['jobTitle'],
                  avatar: e.payload.doc.data()['avatar'],
                  avatarCover: e.payload.doc.data()['avatarCover'],
                  doc: e.payload.doc,
                });
            });
          });
      }
    } catch (err) {}
  }

  sendRequest(user) {
    this.usrs.create_NewRequest(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        avatarCover: user.avatarCover,
        jobTitle: user.jobTitle,
      },
      {
        id: localStorage.getItem('uid'),
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        avatar: localStorage.getItem('avatar'),
        avatarCover: localStorage.getItem('avatarCover'),
        jobTitle: localStorage.getItem('jobTitle'),
      }
    );
  }
}
