import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { MessagesService } from '../services/messages-service.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImageserviceService } from '../services/imageservice.service';


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
  userPictures: number;
  picturesUrl: string[];

  private subscription: Subscription;


  constructor(private userService: UserService, private MessagesService: MessagesService,
    private imageService: ImageserviceService)
   { }

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
      this.userPictures = data.userPictures || 0;
    });
    this.loadImages();
  }
  
  loadImages(){
    this.imageService.getImageUrls().subscribe(
      (urls) => {
        this.picturesUrl = urls;
        console.log(this.picturesUrl);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
