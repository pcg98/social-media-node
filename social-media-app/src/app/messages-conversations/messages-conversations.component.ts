import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages-service.service';


@Component({
  selector: 'app-messages-conversations',
  templateUrl: './messages-conversations.component.html',
  styleUrls: ['./messages-conversations.component.css']
})
export class MessagesConversationsComponent implements OnInit {
  conversations : any;
  
  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.fetchData();
  }
  //To load the conversations
  fetchData() {
    this.messagesService.getUserConversations().subscribe(
      (response) => {
        console.log(response)
        this.conversations = response;
        console.log(this.conversations);
        // Do something with the user(s) data
      },
      (error: any) => {
        console.log("Something was wrong loading the conversations");
      }
    );
  }

}
