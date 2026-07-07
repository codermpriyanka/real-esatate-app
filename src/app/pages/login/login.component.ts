import { Component, OnInit, Output } from '@angular/core';
import {NavbarService} from'../../core/navbar/navbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from './loginservice.service';
import { AuthService } from '../auth/auth.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authForm:FormGroup
  @Output() closeLogin= new EventEmitter<boolean>()
  isLogin=true
  user:any
  role:any
  constructor(private NavbarService:NavbarService,private router:Router,private loginService:LoginserviceService,private authService:AuthService) { }

  ngOnInit() {
    this.authForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl(''),
    })

  }
closeLoginForm(){
  //send to parent to close the login
  this.closeLogin.emit(false)
}
   onSubmit(){
      this.loginService.loginUser(this.authForm.value).subscribe((res:any)=>{
        console.log(res)
        if(res.status === 200){
       sessionStorage.setItem('token', res.token);
       sessionStorage.setItem('firstName',res.user.firstName)
       sessionStorage.setItem('role',res.user.role)
       sessionStorage.setItem('email',res.user.email)
       sessionStorage.setItem("userid",res.user.id)
       //behavior subject to show the user name in nav immediately
       this.authService.isLoggedin.next(true)
        if(res.user.role == 'buyer'){
         this.router.navigate(['buyer/buyer-dashboard'])
        } else if(res.user.role == 'seller'){
         this.router.navigate(['seller/seller-dashboard'])
        } else if(res.user.role == 'admin'){
this.router.navigate(['admin/admin-dashboard'])
        }
        this.authService.loginScreen.next(false)
        }
      },(err)=>{
        if(err.status === 404){
          alert("User not found")
        } else if(err.status === 401){
          alert("Invalid Credentials")
        }
      })
    }

  openSignupForm(){
   this.router.navigate(['/signup'])
   this.closeLogin.emit(false)
   this.authService.signupFlag.next(true)
  }

}
