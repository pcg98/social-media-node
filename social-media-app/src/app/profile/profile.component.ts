import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { MessagesService } from '../services/messages-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  successMessage: string;
  private subscription: Subscription;

  constructor(private userService: UserService, private MessagesService: MessagesService) { }

  ngOnInit() {
    this.subscription = this.MessagesService.message$.subscribe(message => {
      this.successMessage = message;
    });
    const jwt = sessionStorage.getItem('auth-token');
    this.userService.getCurrentUser(jwt)
    .subscribe((data: User) => {
      this.user = new User(data.name, data.last_name, data.email, data.nickname,
        data.telephone, data.password, data.sex, data.user_statusid, data.user_rolid, data.profile_picture, data.id);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
