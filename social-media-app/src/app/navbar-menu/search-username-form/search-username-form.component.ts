import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-username-form',
  templateUrl: './search-username-form.component.html',
  styleUrls: ['./search-username-form.component.css']
})
export class SearchUsernameFormComponent implements OnInit {
  inputNickname: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submitForm(){
    console.log(this.inputNickname,' nickname');
    this.router.navigate(['users/search/',this.inputNickname]);
  }

}
