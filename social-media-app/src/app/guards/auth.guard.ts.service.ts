import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';
import { MessagesService } from '../services/messages-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private messagesService: MessagesService,
               private tokenStorageService: TokenStorageService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!!this.tokenStorageService.getToken()) {
      return true;
    } else {
      this.messagesService.sendMessageAndRedirect('You must be loggin', '/home', false);
      return false;
    }
  }
}
