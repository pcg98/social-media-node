import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/services/messages-service.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  conversation: any;
  chatid;
  messages: any[];
  constructor(private messagesService: MessagesService, private route: ActivatedRoute) { }

  ngOnInit() {
    //Get the id
    this.inicializeComponent();
    //Load the data from the server
    this.fetchData();
  }
  fetchData(){
    this.messagesService.getconversationsMessages(this.chatid).subscribe(
      (response) => {
        console.log(response)
        this.conversation = response;
        console.log(this.conversation);
        this.messages = response.messages;
        console.log(this.messages);
        // Do something with the user(s) data
      },
      (error: any) => {
        console.log("Something was wrong loading the conversations");
      }
    );
  }
  inicializeComponent(){
    this.route.paramMap.subscribe(params => {
      this.chatid = params.get('id');
      console.log("Hola")
      this.fetchData();
    });
  }
  sendMessage(form: Form){

  }

}
