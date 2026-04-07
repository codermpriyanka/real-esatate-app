import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private firestore:AngularFirestore) { }

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
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    status: 'unread'
  };
  await this.firestore.collection('messages').add(data)
  alert("Message Sent Successfully");
  this.contactForm.reset()
  }
}
