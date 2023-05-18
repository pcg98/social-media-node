import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ActionsService } from '../services/actions.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search-users-by-nickname',
  templateUrl: './search-users-by-nickname.component.html',
  styleUrls: ['./search-users-by-nickname.component.css']
})
export class SearchUsersByNicknameComponent implements OnInit {
  nickname : string;
  users : User | User[];
  showMessageForm = false;


  constructor(private route: ActivatedRoute, private userService: UserService,
    private actionsService: ActionsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.nickname = params.get('nickname');
      console.log("Hola")
      this.fetchData();
    });
  }
  fetchData() {
    this.userService.getUsersByNickname(this.nickname).subscribe(
      (response: User | User[]) => {
        console.log(response)
        if (Array.isArray(response)) {
          this.users = response; // Assign the array of users
        } else {
          this.users = [response]; // Create an array with the single user
        }
        console.log(this.users);
        // Do something with the user(s) data
      },
      (error: any) => {
        // Handle error
      }
    );
  }
  //Send the form to the server
  //through the service
  sendRequest(data: any){
    this.actionsService.postSendRequestFriend(data);
  }
  toggleMessageForm() {
    this.showMessageForm = !this.showMessageForm;
  }
  sendMessage(userToId){

  }


}
