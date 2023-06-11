import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MessagesService } from '../services/messages-service.service';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageserviceService } from '../services/imageservice.service';
import { FlashMessagesService } from '../services/flash-messages.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  numberFollowing: number;
  numberFollowers: number;
  userPictures: any;
  photoUrl: SafeUrl;
  picturesUrl: string[];
  profilePicture;
  serverImages =  "http://localhost:8000/api/images/"

  private subscription: Subscription;


  constructor(private userService: UserService, private MessagesService: MessagesService,
    private imageService: ImageserviceService, private sanitizer: DomSanitizer,
    private flashMessagesService: FlashMessagesService)
   { }

  ngOnInit() {
    this.subscription = this.MessagesService.message$.subscribe(message => {
      this.flashMessagesService.showSuccess(message);
    });
    this.userService.getCurrentUser()
    .subscribe((data: any) => {
      console.log(data);
      this.user = data.currentUser;
      this.numberFollowing = data.numberFollowing;
      this.numberFollowers = data.numberFollowers;
      this.userPictures = data.userPictures || null;
      this.loadProfilePicture();
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
  loadProfilePicture(){
    this.imageService.getProfileImageById(this.user.profile_picture)
      .subscribe(
        (photoBlob) =>{
          const photoUrl = URL.createObjectURL(photoBlob);
          this.profilePicture = this.sanitizer.bypassSecurityTrustUrl(photoUrl);
        }
      )
  }

  fetchImageById(id){
    return this.imageService.getImageById(id);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
