import { Component, OnInit } from '@angular/core';
import {NavbarService} from'../../core/navbar/navbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginserviceService } from './loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginVal:boolean=false
  authForm:FormGroup
  isLogin=true
  user:any
  role:any
  constructor(private NavbarService:NavbarService,private router:Router,private authService:AuthService,private loginService:LoginserviceService) { }

  ngOnInit() {
    this.getLoginres()
    this.authForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl(''),
    })
    this.authService.loginModal$.subscribe(val=>{
      this.loginVal=val
    })
    this.user=JSON.parse(sessionStorage.getItem("user"))
  }
  getLoginres(){
 
  }
 
    async onSubmit(){
      if(this.authForm.invalid) return;
      const {email,password}=this.authForm.value
      try{
        //fetching login data from firestore
        const user= await this.authService.login(email,password)
        sessionStorage.setItem('user',JSON.stringify(user))
        this.loginService.setUser(user)
        this.role=user
        if(user.role=='buyer'){
          this.router.navigate(['buyer/buyer-dashboard'])
          this.loginVal=false
        } else if(user.role =='seller'){
          this.router.navigate(['seller/seller-dashboard'])
          this.loginVal=false
        }else if(user.role == 'admin'){
          this.router.navigate(['/admin'])
          this.loginVal=false
        }
      }catch(err){
        console.log(err)
        alert("inavalid credential")
      }
    }

  closeLoginModal(){
    this.authService.closeAll()
  }
  openSignupForm(){
   this.authService.openSignup()
   this.router.navigate(['/signup'])
  }

}
