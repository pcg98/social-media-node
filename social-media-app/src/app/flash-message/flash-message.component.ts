import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from '../services/flash-messages.service';

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent implements OnInit {
  successMessage: string;
  errorMessage: string;
  infoMessage: string;

  constructor(private flashMessagesService: FlashMessagesService) {}

  ngOnInit() {
    this.flashMessagesService.successMessage$.subscribe(message => {
      this.successMessage = message;
      this.clearMessage('success');
    });

    this.flashMessagesService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
      this.clearMessage('error');
    });
    this.flashMessagesService.infoMessage$.subscribe(message => {
      this.infoMessage = message;
      this.clearMessage('info');
    });
  }

  clearMessage(type: string) {
    setTimeout(() => {
      if (type === 'success') {
        this.successMessage = '';
      } else if (type === 'error') {
        this.errorMessage = '';
      } else if (type === 'info') {
        this.infoMessage = '';
      }
    }, 3000);
  }

}
