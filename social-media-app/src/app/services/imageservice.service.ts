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
  }
}
