import { Component, OnInit } from '@angular/core';
import {NavbarService} from'../../core/navbar/navbar.service';
import * as AOS from 'aos';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
isDarkMode:boolean=false;
  constructor(private NavbarService:NavbarService) { }

  ngOnInit() {
this.getDarkMode()
AOS.init({
  duration:800,
  once:true
})
  }
  
getDarkMode(){
this.NavbarService.darkTheme$.subscribe((res)=>{
console.log(res)
this.isDarkMode=res
})
}

}
