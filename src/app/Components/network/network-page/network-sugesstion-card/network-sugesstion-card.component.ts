import { Component, OnInit } from '@angular/core';
//import { userInfo } from 'node:os';
import { NetworkService } from '../../Services/network.service';
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/MainServices/pagination.service';
@Component({
  selector: 'app-network-sugesstion-card',
  templateUrl: './network-sugesstion-card.component.html',
  styleUrls: ['./network-sugesstion-card.component.scss'],
})
export class NetworkSugesstionCardComponent implements OnInit {
  usersinCardData: any[];
  constructor(private usrs: NetworkService,
    private page:PaginationService
    ) {}

  ngOnInit(): void {
    this.page.init('users-details', 'jobTitle', {limit:1, reverse: true, prepend: false })
    console.log(this.page.data)
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

          this.usrs
            .notINCard(Requests.concat(friendData, SentfriendRequest), uid)
            .subscribe((data) => {
              this.usersinCardData = data.map((e) => {
                return {
                  id: e.payload.doc.id,
                  firstName:
                    e.payload.doc.data()['firstName'] +
                    ' ' +
                    e.payload.doc.data()['lastName'],
                  jobTitle: e.payload.doc.data()['jobTitle'],
                  avatar: e.payload.doc.data()['avatar'],
                  avatarCover: e.payload.doc.data()['avatarCover'],
                };
              });
            });
        });
      });
    });
  }
 scrollHandler(e) {
    console.log(e)
    if (e === 'bottom') {
      this.page.more()
    }
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
