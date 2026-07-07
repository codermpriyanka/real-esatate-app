import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
signupFlag=new BehaviorSubject<boolean>(false)
loginScreen =new BehaviorSubject<boolean>(false)
  constructor() { 

  }

  openLogin(){
    this.loginScreen.next(true)
  }
  isLoggedin =new BehaviorSubject<boolean>(
    // ll return true if token exists else return false
    !!sessionStorage.getItem('token')
  )
} 
