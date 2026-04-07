import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.signupForm=new FormGroup({
      role:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl(''),
      confirmPassword:new FormControl('')
      
    })
  }

  backToLogin(){
    this.authService.openLogin();
    this.router.navigate(['/'])
  }


  async onSubmit() {
    if (this.signupForm.invalid) return;
  
    const { email, password, role } = this.signupForm.value;
  
    try {
      const res = await this.authService.signup(email, password, role);
      alert('Signup successful');
  
    } catch (err) {
      console.error(err);
      alert('Error in signup');
    }
  }

}
