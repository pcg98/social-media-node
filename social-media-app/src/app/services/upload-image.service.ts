import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private baseUrl =  `${environment.apiUrl}/users/images`;

  constructor(private http: HttpClient) { }

  upload(file: File, title: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('image', file);
    formData.append('title', title);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
  getFile(imageid: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/files/${imageid}`);
  }
}
