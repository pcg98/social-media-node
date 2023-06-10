import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import {environment} from '../../environments/environment'
const BACKEND_URL = environment.apiUrl + "/auth/"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(BACKEND_URL + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(BACKEND_URL + 'signup', {
      nickname: user.nickname,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }
}
