import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckMessageServiceService {

  constructor(private http:HttpClient) { }
  getMessages(){
    return this.http.get('https://real-estate-backend-zdip.onrender.com/api/contact/get-message')
  }
}
