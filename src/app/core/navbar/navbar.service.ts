import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
private darkTheme=new BehaviorSubject<boolean>(false)
darkTheme$=this.darkTheme.asObservable()
  constructor() { }
  setTheme(value:boolean){
this.darkTheme.next(value)
  }


}
