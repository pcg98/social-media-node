import { Component, OnInit } from '@angular/core';
import { ActionsService } from '../services/actions.service';
import { FlashMessagesService } from '../services/flash-messages.service';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any;

  constructor(private actionsService: ActionsService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.actionsService.getNotifications().subscribe(
      (response: any) => {
        this.notifications = response.notifications;
      },
      (error) => {
        this.flashMessagesService.showError('Error fetching notifications:' +error);
      }
    );
  }

}
