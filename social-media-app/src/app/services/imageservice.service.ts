import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {

  constructor(private http: HttpClient) { }

  getImageUrls(): Observable<string[]> {
    const url = environment.apiUrl+"/users/images"; // Replace with your server's API endpoint
    return this.http.get<string[]>(url);
  };

  getImageById(id: string) {
    console.log(`Getting ${environment.apiUrl}/images/get/${id}`);
    return this.http.get(`${environment.apiUrl}/images/get/${id}`, {
      responseType: 'blob'
    });
  }
  getProfileImageById(id: string) {
    console.log(`Getting ${environment.apiUrl}/images/${id}`);
    return this.http.get(`${environment.apiUrl}/images/${id}`, {
      responseType: 'blob'
    });
  }
  getImageUrlsAndCommentsByPictureId(id: string): Observable<any> {
    const url = `${environment.apiUrl}/images/show/${id}`
    console.log(`Getting ${url}`);
    return this.http.get<any>(`${url}`);
  }
  postCommentInImage(formData){
    const url = `${environment.apiUrl}/images/new-comment`;
    console.log(formData);
    return this.http.post<any>(`${url}`, formData);
  }
}
