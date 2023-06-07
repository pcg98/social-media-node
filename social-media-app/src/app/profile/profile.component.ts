import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { MessagesService } from '../services/messages-service.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  userPictures: any;
  photoUrl: SafeUrl;
  picturesUrl: string[];
  serverImages =  "http://localhost:8000/api/images/"

  private subscription: Subscription;


  constructor(private userService: UserService, private MessagesService: MessagesService,
    private imageService: ImageserviceService, private sanitizer: DomSanitizer)
   { }

  ngOnInit() {
    this.subscription = this.MessagesService.message$.subscribe(message => {
      this.successMessage = message;
    });
    const jwt = sessionStorage.getItem('auth-token');
    this.userService.getCurrentUser(jwt)
    .subscribe((data: any) => {
      console.log(data);
      this.user = data.currentUser;
      this.numberFollowing = data.numberFollowing;
      this.numberFollowers = data.numberFollowers;
      this.userPictures = data.userPictures || null;
      this.loadImagesInfo();
    });
  }

  loadImagesInfo() {
    this.userPictures.forEach((image) => {
      this.fetchImageById(image.id).subscribe(
        (data) => {
          const photoUrl = URL.createObjectURL(data);
          image.result = this.sanitizer.bypassSecurityTrustUrl(photoUrl);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  fetchImageById(id){
    return this.imageService.getImageById(id);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
