import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';
import { catchError, map, tap } from 'rxjs/operators';
import * as internal from 'assert';
import { env } from 'process';
import { FormGroup } from '@angular/forms';


const API_URL = environment.apiUrl+'/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }
  //Get the current user by a server
  //request with the JWT

  getCurrentUser():Observable<User> {
    const jwt = sessionStorage.getItem('auth-token');
    const headers = { 'x-token': jwt }; // Set the Authorization header with the JWT
    return this.http.get<User>(API_URL+"/home", { headers });
  }
  getCurrentUserInfo():any {
    return this.tokenStorageService.getUser();
  }

  createUser(form: FormGroup): Observable<any>{
    console.log("Creating user ",form);
    return this.http.post(`${environment.apiUrl}/register/create`, form.value)
  }
  emailAvaliable(email: string): Observable<boolean>{
    console.log("Checking email "+email);
    return this.http
      .get<boolean>(`${environment.apiUrl}/register/check-email/${email}`);
  }
  checknicknameUnique(nickname: string): Observable<boolean> {
    console.log('Into the checknicknameUnique we get '+nickname);
    return this.http
      .get<boolean>(`${environment.apiUrl}/register/check-nickname/${nickname}`);
  }
  getUsersByNickname(nickname: string) {
    console.log('Enter in the service');
    return this.http
      .get(`${environment.apiUrl}/actions/search-user/${nickname}`);
  }
  updateUser(data){
    console.log('Updating user '+data);
    return this.http
      .patch(`${environment.apiUrl}/users/update`, data);
  }
  closeAccount(){
    console.log('Closing account ');
    return this.http
      .get(`${environment.apiUrl}/users/close-profile`);
  }

  changeProfilePicture(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('image', file);

    const req = new HttpRequest('POST', `${environment.apiUrl}/users/profile/picture`, formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

}

