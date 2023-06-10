import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActionsService } from '../services/actions.service';
import { FlashMessagesService } from '../services/flash-messages.service';


@Component({
  selector: 'app-messages-form',
  templateUrl: './messages-form.component.html',
  styleUrls: ['./messages-form.component.css']
})
export class MessagesFormComponent implements OnInit {
  @Input() targetid: string;
  @Output() close = new EventEmitter<void>();


  constructor(private actionsService: ActionsService,
    private flashMessagesService: FlashMessagesService) { }

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
      this.flashMessagesService.showSuccess('Message was sent');
      //Close the messages form
      this.closeMessages();
      // ...
    }, error => {
      this.flashMessagesService.showError('Something was wrong sending the message '+error);
    });
  }

}
