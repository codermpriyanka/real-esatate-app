import { Component, OnInit } from '@angular/core';
import {NavbarService} from'./navbar.service';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/pages/login/loginservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
isDarkMode=false;
isMenuOpen=false;
loginScreen:boolean=false;
actualRole:any
role:any;
userRole:any
userRoleName:any
name:any
firstName:any
token:any

  constructor(private NavbarService:NavbarService,private authService:AuthService,private router:Router,private loginService:LoginserviceService) { }

  ngOnInit() {
    this.authService.loginScreen.subscribe((res)=>{
      this.loginScreen = res;
    })

  this.authService.isLoggedin.subscribe((res)=>{
    if(res){
 this.token=sessionStorage.getItem("token")
   this.firstName=sessionStorage.getItem("firstName")
   this.role=sessionStorage.getItem("role")
  console.log(this.firstName)
    }else{
      this.token =null;
      this.firstName=null;
      this.role=null;
    }
  })
  }


toggleTheme(){
  this.isDarkMode=!this.isDarkMode
  this.NavbarService.setTheme(this.isDarkMode)
}
toggleMenu(){
  this.isMenuOpen=!this.isMenuOpen  
}
getUserData(){
}
openLogin(){
 this.loginScreen=true
}

logout(){
  sessionStorage.clear()
  this.authService.isLoggedin.next(false)
  this.token=null
  this.firstName=null
  this.role=null
  this.router.navigate(['/'])
}

}
