import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';


const API_URL = environment.apiUrl+'/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  //Get the current user by a server
  //request with the JWT

  getCurrentUser(jwt: string):Observable<User> {
    const headers = { 'x-token': jwt }; // Set the Authorization header with the JWT
    return this.http.get<User>(API_URL+"/home", { headers });
  }
  createUser(data: any): Observable<any>{
    console.log("Creating user ",data);
    return this.http.post(API_URL+"/create", data)
  }
  emailAvaliable(data: any): Observable<any>{
    console.log("Creating user ",data);
    return this.http.post(API_URL+"/check-email", data)
  }
  checkUsernameUnique(username: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${API_URL}/users/check-username/${username}`);
  }
}

