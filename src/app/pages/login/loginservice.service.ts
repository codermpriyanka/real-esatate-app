import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor() { }
  private userSubject=new BehaviorSubject<any>(null)
  user$=this.userSubject.asObservable()
  setUser(user:any){
  this.userSubject.next(user)
  }
  getUser(){
    return this.userSubject.value
  }
}
