import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages-service.service';
import { Subscription } from 'rxjs';
import { FlashMessagesService } from '../services/flash-messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private subscription: Subscription;


  constructor(private MessagesService: MessagesService, private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.subscription = this.MessagesService.message$.subscribe(message => {
      this.flashMessagesService.showInfo(message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
