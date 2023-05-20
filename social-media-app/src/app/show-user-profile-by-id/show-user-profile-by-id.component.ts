import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ActionsService } from '../services/actions.service';


@Component({
  selector: 'app-show-user-profile-by-id',
  templateUrl: './show-user-profile-by-id.component.html',
  styleUrls: ['./show-user-profile-by-id.component.css']
})
export class ShowUserProfileByIdComponent implements OnInit {
  nickname : string;
  user : User;
  showMessageForm = false;
  targetid : number;
  form: FormBuilder;


  constructor(private route: ActivatedRoute, private actionsService: ActionsService) { }

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
        console.log(this.user);
        // Do something with the user(s) data
      },
      (error: any) => {
        console.log("Something was wrong loading the user");
      }
    );
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
      alert("Send request");
      // ...
    }, error => {
      // Handle any error that occurs during the request
      console.error('Error:', error);
      // ...
    });
  }
  cancelRequest(form: NgForm) {
    const formValues = form.value;
    console.log('Form Data Cancel:', formValues);
    this.actionsService.postCancelRequestFriend(formValues)
    .subscribe(response => {
      // Handle the response from the server
      console.log('Response:', response);
      alert("Canceled request");
      // ...
    }, error => {
      // Handle any error that occurs during the request
      console.error('Error:', error);
      // ...
    });
  }
  toggleMessageForm() {
    this.showMessageForm = !this.showMessageForm;
  }
  sendMessage(userToId){

  }


}
