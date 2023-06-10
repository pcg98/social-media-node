import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { ActionsService } from '../services/actions.service';
import { FlashMessagesService } from '../services/flash-messages.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  type: string;
  follows: User[];
  serverImages =  "http://localhost:8000/api/images/"

  constructor(private route: ActivatedRoute,
    private actionsService :ActionsService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.fetchData();
  }
  fetchData(){
    //Catch the type of user who want to retrieve
    //information
    if(!this.type){
      this.route.url.subscribe(url => {
        this.type = url[0].path;
      });
    }
    if(this.type == 'following'){
      this.inicializateFollowing();
    }
    if(this.type == 'followers'){
      this.inicializateFollowers();
    }
  }

  inicializateFollowing(){
    this.actionsService.getUserFollowing()
    .subscribe(response => {
      // Handle the response from the server
      console.log('Response following:', response);
      this.follows = response.map((res) => res.target );
    }, error => {
      this.flashMessagesService.showError('Something was wrong '+error);
    });
  }
  inicializateFollowers(){
    this.actionsService.getUserFollowers()
    .subscribe(response => {
      console.log('Response followers:', response);
      this.follows = response.map((res) => res.source );
    }, error => {
      this.flashMessagesService.showError('Something was wrong '+error);
    });
  }
  deleteUser(id:number){
    //Pass the id of the other user and it's a follower or following
    this.actionsService.deleteUserFollow(id, this.type)
    .subscribe(response => {
      this.flashMessagesService.showSuccess('Success in the operation');
      console.log('Response:', response);
      this.fetchData();
      // ...
    }, error => {
      this.flashMessagesService.showError('Something was wrong '+error);
    });
  }

}
