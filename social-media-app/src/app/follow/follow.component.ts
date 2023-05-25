import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionsService } from '../services/actions.service';


@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  type: string;
  follow: any;


  constructor(private route: ActivatedRoute,
    private actionsService :ActionsService) { }

  ngOnInit() {
    //Catch the type of user who want to retrieve
    //information
    this.route.url.subscribe(url => {
      this.type = url[0].path;
    });
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
      this.follow = response;
      alert("Followings load");
      // ...
    }, error => {
      // Handle any error that occurs during the request
      console.error('Error:', error);
      // ...
    });
  }
  inicializateFollowers(){
    this.actionsService.getUserFollowers()
    .subscribe(response => {
      // Handle the response from the server
      console.log('Response followers:', response);
      this.follow = response;
      alert("Followers load");
      // ...
    }, error => {
      // Handle any error that occurs during the request
      console.error('Error:', error);
      // ...
    });
  }

}
