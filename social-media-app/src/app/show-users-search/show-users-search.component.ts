import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ActionsService } from '../services/actions.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'show-users-search',
  templateUrl: './show-users-search.component.html',
  styleUrls: ['./show-users-search.component.css']
})
export class ShowUsersSearchComponent implements OnInit {
  nickname : string;
  users : User | User[];
  showMessageForm = false;
  id : number;
  form: FormBuilder;


  constructor(private route: ActivatedRoute, private userService: UserService,
    private actionsService: ActionsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.nickname = params.get('nickname');
      console.log("Hola")
      this.fetchData();
      this.id = this.userService.getCurrentUserInfo().id;
    });
  }
  fetchData() {
    this.userService.getUsersByNickname(this.nickname).subscribe(
      (response: User | User[]) => {
        console.log(response)
        if (Array.isArray(response)) {
          this.users = response; // Assign the array of users
        } else {
          this.users = [response]; // Create an array with the single user
        }
        console.log(this.users);
        // Do something with the user(s) data
      },
      (error: any) => {
        // Handle error
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
  toggleMessageForm() {
    this.showMessageForm = !this.showMessageForm;
  }
  sendMessage(userToId){

  }


}
