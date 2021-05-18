import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/MainServices/User.service';
import { UserProfileService } from '../../profile/Service/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  data: Observable<any>;
  toggleStatus: boolean = false;
  public isMenuCollapsed = true;
  uid: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  avatar: string;

  constructor(
    private router: Router,
    private userProfile: UserProfileService,
    private us: UserService
  ) {
    this.data = this.us.localUserData.asObservable();
    this.data.subscribe(() => {
      this.uid = this.us.localUserData.value.id;
      this.firstName = this.us.localUserData.value.firstName;
      this.lastName = this.us.localUserData.value.lastName;
      this.jobTitle = this.us.localUserData.value.jobTitle;
      this.avatar = this.us.localUserData.value.avatar;
    });
  }

  ngOnInit(): void {}

  toggleSideBar() {
    this.toggleStatus = !this.toggleStatus;
  }
  signOut() {
    localStorage.clear();
    this.router.navigate(['/Login']);
  }
}
