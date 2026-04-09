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

  constructor(private NavbarService:NavbarService,private authService:AuthService,private router:Router,private loginService:LoginserviceService) { }

  ngOnInit() {
   this.getUserData() 
   this.userRole=JSON.parse(sessionStorage.getItem('user')||'{}')
  this.loginService.user$.subscribe(user=>{
    if(user){
      this.setUserData(user)
    }else{
      this.userRoleName = null;
      this.name = null;
      this.userRole = null; 
    }
  })
  }

  setUserData(user:any){
   this.userRole=user
   const email = this.userRole.email || '';
   this.name = email.split('@')[0];
   this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
   console.log(this.name ,"namee")
   this.userRoleName=this.userRole.role;
   console.log(this.userRoleName ,"user role name")
  }

toggleTheme(){
  this.isDarkMode=!this.isDarkMode
  this.NavbarService.setTheme(this.isDarkMode)
}
toggleMenu(){
  this.isMenuOpen=!this.isMenuOpen  
}
getUserData(){
  this.authService.user$.subscribe((res)=>{
    console.log(res)
    this.role=res
  })
}
//coming form authservice 
login(){
  if(this.role){
  this.authService.logOut()
  this.userRoleName=null
  this.name=null
    this.userRole=null
    this.router.navigate(['./'])
  }else{
    this.authService.openLogin()
  }
}

}
