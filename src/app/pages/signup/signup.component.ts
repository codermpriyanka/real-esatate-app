import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SignupSeviceService } from './signup-sevice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup
  signUpOpenFlag:boolean=true
  constructor(private authService:AuthService,private router:Router,private signupService:SignupSeviceService) { }

  ngOnInit() {
    this.signupForm=new FormGroup({
      role:new FormControl(''),
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl(''),
      confirmPassword:new FormControl('')
      
    })

    this.authService.signupFlag.subscribe((res)=>{
      this.signUpOpenFlag=res
    })
  }

  backToLogin(){
    this.authService.openLogin()
  }
closeSignUpForm(){
  this.signUpOpenFlag =false;
  this.router.navigate(['/'])
}

 onSubmit() {
this.signupService.signUpUser(this.signupForm.value).subscribe((res:any)=>{
  console.log(res)
if(res.status===200 || res.success){
  alert("User Registered Successfully")
this.router.navigate(['/'])
}
},(err)=>{
  if(err.status === 400){
    alert("User Already Exists")
  } else if (err.status === 500){
    alert("Server Error")
  }else{
    alert("Something Went Wrong")
  }
})
  }

}
