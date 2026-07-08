import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private http:HttpClient) { }
  sendMessage(data:any){
    return this.http.post('https://real-estate-backend-zdip.onrender.com/api/contact/send-message',data)
    // name,email,message,sendBy,role
  }
}
