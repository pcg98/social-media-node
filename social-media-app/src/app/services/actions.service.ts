import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';


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
  postSendRequestFriend(data: any): Observable<any>{
    console.log("Sending a request ",data);
    console.log(API_URL+"/send-request");
    console.log(data.targetId)
    return this.http.post(API_URL+"/send-request",{
      targetId: data.targetId,
      sourceId: data.sourceId
    }, httpOptions);
  }
}
