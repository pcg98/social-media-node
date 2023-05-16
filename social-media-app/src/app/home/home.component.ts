import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  successMessage: string;
  private subscription: Subscription;


  constructor(private MessagesService: MessagesService) { }

  ngOnInit() {
    this.subscription = this.MessagesService.message$.subscribe(message => {
      this.successMessage = message;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
