import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashMessagesService {
  private successMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private errorMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public successMessage$: Observable<string> = this.successMessageSubject.asObservable();
  public errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

  constructor() {}

  showSuccess(message: string): void {
    this.successMessageSubject.next(message);
  }

  showError(message: string): void {
    this.errorMessageSubject.next(message);
  }
}
