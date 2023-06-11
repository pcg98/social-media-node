import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessagesService } from '../services/messages-service.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  TOKEN_KEY = 'auth-token';

  constructor(private router: Router, private messagesService: MessagesService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        () => {},
        (error) => {
          if (error.status === 401) {
            // JWT expired or invalid
            // Clear JWT from local storage or cookies
            sessionStorage.getItem(this.TOKEN_KEY); // Assuming JWT is stored in local storage
            // Redirect to login page
            this.messagesService.sendMessageAndRedirect('Token expired, please start session again', '/home', false);
          }
        }
      )
    );
  }
}
export const tokenInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
