import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


const API_URL = environment.apiUrl+'/actions';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(private http: HttpClient) { }

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
  //Method to send a request to somebody
  postSendRequestFriend(data: any): Observable<any>{
    console.log("Sending a request ",data);
    console.log(API_URL+"/send-request");
    console.log(data.targetid)
    return this.http.post(API_URL+"/send-request",{
      targetid: data.targetid,
      sourceid: data.sourceid
    }, httpOptions);
  }
  //Method to cancel a request friend
  postCancelRequestFriend(data: any): Observable<any>{
    console.log("Cancelling a request ",data);
    console.log(API_URL+"/cancel-request");
    console.log(data.targetId)
    return this.http.post(API_URL+"/cancel-request",{
      targetid: data.targetid,
      sourceid: data.sourceid
    }, httpOptions);
  }
  postResponseRequestFriend(data: any): Observable<any>{
    console.log("Answering a request ",data);
    console.log(`${environment.apiUrl}/followers/requests/answer`);
    console.log(data.sourceid)
    return this.http.post(`${environment.apiUrl}/followers/requests/answer`,{
      answer: data.answer,
      sourceid: data.sourceid
    }, httpOptions);
  }
  postSendMessage(data: any): Observable<any>{
    console.log("Sending a message ",data);
    console.log(API_URL+"/send-message");
    console.log(data.targetId)
    return this.http.post(API_URL+"/send-message",{
      targetid: data.targetid,
      body: data.body
    }, httpOptions);
  }
  //Method to get an user profile
  //to show the user to another
  getUserProfileById(id: number): Observable<any> {
    console.log('Showing user');
    return this.http
      .get(`${environment.apiUrl}/actions/profile/${id}`);
  }
  //Request when the user is the target
  getUserTargetRequests(): Observable<any> {
    console.log('Showing requests');
    return this.http
      .get(`${environment.apiUrl}/followers/requests`);
  }
  //Get the followers from the actual user
  getUserFollowers(): Observable<any> {
    console.log('Showing followers');
    return this.http
      .get(`${environment.apiUrl}/followers`);
  }
  //Get the followings from the actual user
  getUserFollowing(): Observable<any> {
    console.log('Showing following');
    return this.http
      .get(`${environment.apiUrl}/following`);
  }
  deleteUserFollowing(targetid: number): Observable<any> {
    console.log('Deleting following');
    return this.http
      .delete(`${environment.apiUrl}/following/delete/${targetid}`);
  }
  deleteUserFollow(id: number, type: string): Observable<any> {
    console.log('Deleting follower');
    if(type == "following"){
      return this.http
      .delete(`${environment.apiUrl}/following/delete/${id}`);
    }
    if(type == "followers"){
      return this.http
      .delete(`${environment.apiUrl}/followers/delete/${id}`);
    }
  }
}
