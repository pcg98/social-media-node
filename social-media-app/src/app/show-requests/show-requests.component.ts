import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { ActionsService } from '../services/actions.service';

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


  constructor(private actionsService: ActionsService) { }

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
        // Handle error
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
      alert("Answering request");
      this.fetchData();
      // ...
    }, error => {
      // Handle any error that occurs during the request
      console.error('Error:', error);
      // ...
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
      alert("Answering request");
      this.fetchData();
      // ...
    }, error => {
      // Handle any error that occurs during the request
      console.error('Error:', error);
      // ...
    });
  }

  sendAnswer(form: NgForm){
    const formValues = form.value;
    console.log('Form Data:', formValues);
    this.actionsService.postResponseRequestFriend(formValues)
    .subscribe(response => {
      // Handle the response from the server
      console.log('Response:', response);
      alert("Answering request");
      this.fetchData();
      // ...
    }, error => {
      // Handle any error that occurs during the request
      console.error('Error:', error);
      // ...
    });
  }


}
