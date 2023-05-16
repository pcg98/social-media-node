import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messageSubject = new BehaviorSubject<string>(''); // Initialize with an empty string
  message$ = this.messageSubject.asObservable();
  constructor(private router: Router) { }
  sendMessageAndRedirect(message: string, component: string) {
    this.messageSubject.next(message);
    this.router.navigate([component]);
  }
}
