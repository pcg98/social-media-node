import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    const jwt = sessionStorage.getItem('auth-token');
    this.userService.getCurrentUser(jwt)
    .subscribe((data: User) => {
      console.log(data)
      this.user = new User(data.name, data.last_name, data.email, data.nickname,
        data.telephone, data.password, data.sex, data.user_statusid, data.user_rolid, data.profile_picture, data.id);
      console.log(this.user instanceof User);
    });
  }

}
