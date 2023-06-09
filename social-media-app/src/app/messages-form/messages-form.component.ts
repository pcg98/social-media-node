import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionsService } from '../services/actions.service';

@Component({
  selector: 'app-messages-form',
  templateUrl: './messages-form.component.html',
  styleUrls: ['./messages-form.component.css']
})
export class MessagesFormComponent implements OnInit {
  @Input() targetid: string;
  @Output() close = new EventEmitter<void>();


  constructor(private actionsService: ActionsService) { }

  ngOnInit() {
  }

  closeMessages(): void {
    this.close.emit();
  }
  sendMessage(form: NgForm){
    const message = form.value;
    console.log("Message:");
    console.log(message);
    this.actionsService.postSendMessage(message)
    .subscribe(response => {
      // Handle the response from the server
      console.log('Response:', response);
      alert("Message was sent");
      //Close the messages form
      this.closeMessages();
      // ...
    }, error => {
      // Handle any error that occurs during the request
      console.error('Error:', error);
      // ...
    });
  }

}
