import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactServiceService } from './contact-service.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private contactService:ContactServiceService) { }

  ngOnInit() {
    this.contactForm=new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      message: new FormControl('')
    })
  }
 async onSubmit(){
  const data = {
    name: this.contactForm.value.name,
    email: this.contactForm.value.email,
    message: this.contactForm.value.message,
    to: 'admin@gmail.com', 
    sendBy:sessionStorage.getItem("firstName"),
    role:sessionStorage.getItem("role"),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    status: 'unread'
  };
  this.contactService.sendMessage(data).subscribe((res)=>{
    console.log(res)
  },err=>{
    console.log(err)
  })
  alert("Message Sent Successfully");
  this.contactForm.reset()
  }
}
