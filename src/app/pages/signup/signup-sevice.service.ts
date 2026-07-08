import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupSeviceService {

  constructor(private http:HttpClient) { }

  signUpUser(user:any){
    return this.http.post('https://real-estate-backend-zdip.onrender.com/api/auth/signup',user,{observe:'response'})
  }

}
