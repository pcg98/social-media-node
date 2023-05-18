import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';
import { catchError, map, tap } from 'rxjs/operators';


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
  /*
  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ API_URL }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true),
      catchError( error => of(false) )
    );

  }*/
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
  getUsersByNickname(nickname: string) {
    console.log('Enter in the service');
    return this.http
      .get(`${API_URL}/by-nickname/${nickname}`);
  }
}

