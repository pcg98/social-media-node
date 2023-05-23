import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/services/messages-service.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  conversation: any;
  chatid;
  messages: any[];
  currentUserId: Number;
  targetid: Number; //Other user
  constructor(private messagesService: MessagesService, private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    //Get the id and load from the server
    this.inicializeComponent();
    //Get the actual user
    this.currentUserId = this.tokenStorageService.getUser().id;
  }
  fetchData(){
    this.messagesService.getconversationsMessages(this.chatid).subscribe(
      (response) => {
        console.log(response)
        this.conversation = response;
        console.log(this.conversation);
        this.messages = response.messages;
        //Get the other user id
        this.targetid = (this.conversation.sourceid != this.currentUserId) ? this.conversation.sourceid : this.conversation.targetid
        console.log(this.targetid)
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
  sendMessage(form: NgForm){
    const message = form.value;
    console.log("Message:");
    console.log(message);
    this.messagesService.postSendMessage(message)
    .subscribe(response => {
      // Handle the response from the server
      console.log('Response:', response);
      alert("Message was sent");
      //Read the messages
      this.fetchData();
      // ...
    }, error => {
      // Handle any error that occurs during the request
      console.error('Error:', error);
      // ...
    });
  }

}
