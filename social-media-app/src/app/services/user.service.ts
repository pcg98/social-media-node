import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';
import { catchError, map, tap } from 'rxjs/operators';
import * as internal from 'assert';


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
      .get(`${environment.apiUrl}/actions/search-user/${nickname}`);
  }
  updateUser(data){
    console.log('Updating user '+data);
    return this.http
      .patch(`${environment.apiUrl}/actions/update`, data);
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

