import { Injectable } from '@angular/core';
import { observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private nickname: any;

  constructor(private userService: UserService) { }

  setNicknameData(data: any) {
    this.nickname = data;
  }

  getUsersByNickname() {
    return this.userService.getUsersByNickname(this.nickname);
  }
}
