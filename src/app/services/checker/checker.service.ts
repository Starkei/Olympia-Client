import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckerService {

  constructor(private http: HttpClient) { }

  isReference(url: string): Observable<any> {
    let httpHeader: HttpHeaders = new HttpHeaders();
    httpHeader.append('Access-Control-Allow-Origin', '*');
    httpHeader.append('origin', 'https://olympia-ladder-of-success.herokuapp.com');
    return this.http.get(url, {
      observe: "response",
      headers: httpHeader
    });
  }

}
