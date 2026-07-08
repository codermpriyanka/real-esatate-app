import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
  constructor(private http:HttpClient) { }
 
  loginUser(val:any){
    return this.http.post('https://real-estate-backend-zdip.onrender.com/api/auth/login',val)
  }


 
}
