import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { ActionsService } from '../services/actions.service';
import { FlashMessagesService } from '../services/flash-messages.service';

@Component({
  selector: 'app-show-requests',
  templateUrl: './show-requests.component.html',
  styleUrls: ['./show-requests.component.css']
})
export class ShowRequestsComponent implements OnInit {
  user : User
  id : number;
  requests: any;
  form: FormBuilder;


  constructor(private actionsService: ActionsService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.actionsService.getUserTargetRequests().subscribe(
      (response) => {
        console.log(response)
        this.requests = response
        console.log(this.requests);
      },
      (error: any) => {
        this.flashMessagesService.showError('Something was wrong '+error);
      }
    );
  }

  acceptRequest(form: NgForm){
    const formValues = form.value;
    formValues.answer = "accepted"
    console.log('Form Data:', formValues);
    this.actionsService.postResponseRequestFriend(formValues)
    .subscribe(response => {
      // Handle the response from the server
      console.log('Response:', response);
      this.flashMessagesService.showSuccess("Request answered");
      this.fetchData();
      // ...
    }, error => {
      // Handle any error that occurs during the request
      this.flashMessagesService.showError('Something was wrong '+error);
    });
  }

  rejectRequest(form: NgForm){
    const formValues = form.value;
    formValues.answer = "rejected"
    console.log('Form Data:', formValues);
    this.actionsService.postResponseRequestFriend(formValues)
    .subscribe(response => {
      // Handle the response from the server
      console.log('Response:', response);
      this.flashMessagesService.showSuccess("Request rejected");
      this.fetchData();
      // ...
    }, error => {
      // Handle any error that occurs during the request
      this.flashMessagesService.showError("Something was wrong "+error);
      // ...
    });
  }


}
