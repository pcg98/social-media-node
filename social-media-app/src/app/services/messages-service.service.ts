import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FlashMessagesService } from './flash-messages.service';
const API_URL = environment.apiUrl+'/messages';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messageSubject = new BehaviorSubject<string>(''); // Initialize with an empty string
  message$ = this.messageSubject.asObservable();

  constructor(private router: Router, private http: HttpClient,
    private flashMessagesService: FlashMessagesService) { }

  sendMessageAndRedirect(message: string, url: string, reload=false) {
    //Redirect to the url
    this.router.navigateByUrl(url).then(() => {
      if(reload){ //If reload...
        window.location.reload();
      }
      this.messageSubject.next(message);
    });
  }

  getUserConversations(): Observable<any> {
    console.log('Showing conversations');
    return this.http
      .get(API_URL);
  }

  getconversationsMessages(conversationid: number): Observable<any> {
    console.log('Showing messages from a conversation');
    return this.http
      .get(`${API_URL}/${conversationid}`);
  }
  postSendMessage(data: any): Observable<any>{
    console.log("Sending a message ",data);
    console.log(API_URL+"/send-message");
    console.log(data.targetId)
    return this.http.post(`${environment.apiUrl}/actions/send-message`,{
      targetid: data.targetid,
      body: data.body
    }, httpOptions);
  }

}
