import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ActionsService } from '../services/actions.service';
import { FlashMessagesService } from '../services/flash-messages.service';
import { ImageserviceService } from '../services/imageservice.service';

@Component({
  selector: 'app-show-user-profile-by-id',
  templateUrl: './show-user-profile-by-id.component.html',
  styleUrls: ['./show-user-profile-by-id.component.css']
})
export class ShowUserProfileByIdComponent implements OnInit {
  nickname : string;
  user ;
  showMessageForm: boolean = false;
  targetid : number;
  form: FormBuilder;
  serverImages =  "http://localhost:8000/api/images/";
  userPictures: any;
  photoUrl: SafeUrl;
  profilePicture;


  constructor(private route: ActivatedRoute, private actionsService: ActionsService,
    private imageService: ImageserviceService, private sanitizer: DomSanitizer,
    private flashMessagesService: FlashMessagesService) { }

  //On init...
  ngOnInit() {
    //Subscribe to get the idProfile
    this.route.paramMap.subscribe(params => {
      //Get the idProfile required
      this.targetid = Number(params.get('targetid'));
      console.log(this.targetid)
      //Fetch data, get the search user
      this.fetchData();
    });
  }
  fetchData() {
    this.actionsService.getUserProfileById(this.targetid).subscribe(
      (response: User) => {
        console.log(response)
        this.user = response;
        this.userPictures = response.userPictures || null;
        this.loadProfilePicture();
        if(this.userPictures){
          this.loadImagesInfo();
        }
        console.log(this.user);
        // Do something with the user(s) data
      },
      (error: any) => {
        this.flashMessagesService.showError('Something was wrong loading the user' +error);
      }
    );
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
          console.log("cargada")
          this.profilePicture = this.sanitizer.bypassSecurityTrustUrl(photoUrl);
        }
      )
  }
  fetchImageById(id){
    return this.imageService.getImageById(id);
  }

  //Send the form to the server
  //through the service
  sendRequest(form: NgForm) {
    const formValues = form.value;
    console.log('Form Data:', formValues);
    this.actionsService.postSendRequestFriend(form.value)
    .subscribe(response => {
      // Handle the response from the server
      console.log('Response:', response);
      this.flashMessagesService.showSuccess('Request send');
      this.fetchData();
    }, error => {
      this.flashMessagesService.showError('Something was wrong sending the request' +error);
    });
  }
  cancelRequest(form: NgForm) {
    const formValues = form.value;
    console.log('Form Data Cancel:', formValues);
    this.actionsService.postCancelRequestFriend(formValues)
    .subscribe(response => {
      this.flashMessagesService.showSuccess('Request canceled');
      this.fetchData();
      // ...
    }, error => {
      this.flashMessagesService.showError('Something was wrong cancelling' +error);
    });
  }
  toggleMessageForm() {
    this.showMessageForm = !this.showMessageForm;
  }

  unfollow(){
    this.actionsService.deleteUserFollowing(this.targetid)
    .subscribe((data) => {
      this.flashMessagesService.showSuccess('Unfollow user');
      console.log(data)
      this.fetchData();
    },
    (error) => {
      this.flashMessagesService.showError('Something was wrong unfollowing ' +error);
    })
  }


}
