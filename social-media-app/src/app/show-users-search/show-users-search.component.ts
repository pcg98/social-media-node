import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ActionsService } from '../services/actions.service';
import { FlashMessagesService } from '../services/flash-messages.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'show-users-search',
  templateUrl: './show-users-search.component.html',
  styleUrls: ['./show-users-search.component.css']
})
export class ShowUsersSearchComponent implements OnInit {
  nickname : string;
  users : User | User[];
  visibleMessageForm = false;
  id : number;
  form: FormBuilder;
  serverImages =  "http://localhost:8000/api/images/"


  constructor(private route: ActivatedRoute, private userService: UserService,
    private actionsService: ActionsService, private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.inicializeComponent();
  }
  inicializeComponent(){
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
      },
      (error: any) => {
        this.flashMessagesService.showError('Something was wrong getting the users '+error);
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
      this.flashMessagesService.showSuccess('Success sending the request');
      this.inicializeComponent();
    }, error => {
      this.flashMessagesService.showError('Something was wrong sending the request '+error);
    });
  }
  cancelRequest(form: NgForm) {
    const formValues = form.value;
    console.log('Form Data Cancel:', formValues);
    this.actionsService.postCancelRequestFriend(formValues)
    .subscribe(response => {
      console.log('Response:', response);
      this.flashMessagesService.showSuccess('Success cancelling the request');
      this.inicializeComponent();
    }, error => {
      this.flashMessagesService.showError('Something was wrong cancelling the request '+error);
    });
  }
  //Hide or display the form
  showMessageForm() {
    this.visibleMessageForm = !this.visibleMessageForm;
  }



}
