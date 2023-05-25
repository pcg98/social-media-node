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
  user: any;
  successMessage: string;
  numberFollowing: number;
  numberFollowers: number;
  numberPictures: number;

  private subscription: Subscription;

  constructor(private userService: UserService, private MessagesService: MessagesService) { }

  ngOnInit() {
    this.subscription = this.MessagesService.message$.subscribe(message => {
      this.successMessage = message;
    });
    const jwt = sessionStorage.getItem('auth-token');
    this.userService.getCurrentUser(jwt)
    .subscribe((data: any) => {
      this.user = data.currentUser;
      this.numberFollowing = data.numberFollowing;
      this.numberFollowers = data.numberFollowers;
      this.numberPictures = data.numberPicture || 0;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
