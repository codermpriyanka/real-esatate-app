import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NavbarService} from'../../core/navbar/navbar.service';
@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(private firestore:AngularFirestore,private NavbarService:NavbarService) { }
  properties:any[]=[]
  showBuyModal = false;
  boughtPropertyIds: string[] = []; 
selectedProperty: any;
buyForm: FormGroup;
user:any
isDarkMode:boolean=false;
  ngOnInit() {
    this.getApprovedProperties()
    this.getBoughtProperties()
    this.buyForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      paymentMethod: new FormControl('', Validators.required),
      transactionId: new FormControl('', Validators.required)
    });
    this.user= JSON.parse(sessionStorage.getItem('user') || '{}') as any;
 this.getDarkMode()
  }

  getBoughtProperties() {
    this.firestore.collection('orders').snapshotChanges().subscribe((res: any) => {
      this.boughtPropertyIds = res.map((e: any) => {
        const data = e.payload.doc.data();
        return data.propertyId;
      });
    });
  }
  getApprovedProperties() {
    this.firestore.collection('properties', ref => ref.where('status', '==', 'approved')
    ).snapshotChanges().subscribe((res: any) => {
      this.properties = res.map((e: any) => {
        const data = e.payload.doc.data();
        const id = e.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  openBuyModal(p: any) {
    this.selectedProperty = p;
    this.showBuyModal = true;
  }
  closeModal() {
    this.showBuyModal = false;
    this.buyForm.reset();
  }

  async submitBuy(){
    if(this.buyForm.invalid){
      alert("Please fill All Fields")
      return
    }
    const data = {
      ...this.buyForm.value,
      propertyId: this.selectedProperty.id,
      propertyName: this.selectedProperty.propertyName,
      price: this.selectedProperty.price,
      email: this.user.email,  
      date: new Date(),
      status: 'bought'
    };
    await this.firestore.collection('orders').add(data)
    alert("Property Bought Successfully");
    console.log("DATA GOING TO FIRESTORE:", data); 
    this.closeModal()
  }
  getDarkMode(){
    this.NavbarService.darkTheme$.subscribe((res)=>{
      console.log(res)
  this.isDarkMode=res
    })
   }
}


