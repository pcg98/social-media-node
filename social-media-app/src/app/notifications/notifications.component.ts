import { Component, OnInit } from '@angular/core';
import { ActionsService } from '../services/actions.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any;

  constructor(private actionsService: ActionsService) { }

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    // Call your API service to fetch notifications from the server
    this.actionsService.getNotifications().subscribe(
      (response: any) => {
        this.notifications = response.notifications;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
  
}
