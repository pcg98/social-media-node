import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashMessagesService {
  private successMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private errorMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private infoMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public successMessage$: Observable<string> = this.successMessageSubject.asObservable();
  public errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();
  public infoMessage$: Observable<string> = this.infoMessageSubject.asObservable();

  constructor(private router: Router) {}

  showSuccess(message: string): void {
    this.successMessageSubject.next(message);
  }
  showInfo(message: string): void {
    this.infoMessageSubject.next(message);
  }

  showError(message: string): void {
    this.errorMessageSubject.next(message);
  }
}
