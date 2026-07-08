import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NavbarService} from'../../core/navbar/navbar.service';
import { BuyerServiceService } from './buyer-service.service';
@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(private NavbarService:NavbarService,private buyerService:BuyerServiceService) { }
  showBuyModal = false;
  buyerProperty:any[]=[]
selectedProperty: any;
selectedPropertyId:any
buyForm: FormGroup;
user:any
userid:any
isDarkMode:boolean=false;
  ngOnInit() {
    this.getApprovedProperties()
    this.buyForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern('^[A-Za-z ]+$')]),
      email: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      mobile: new FormControl('', [Validators.required,Validators.pattern('^[6-9][0-9]{9}$')]),
      paymentMethod: new FormControl('', Validators.required),
      transactionId: new FormControl('', Validators.required)
    });
    this.user= JSON.parse(sessionStorage.getItem('user') || '{}') as any;
 this.getDarkMode()
 this.userid=sessionStorage.getItem("userid")
  }

 
  getApprovedProperties() {
    this.buyerService.buyerEligbleProperty().subscribe((res:any)=>{
      console.log(res)
      this.buyerProperty=res.data
    },err=>{
      console.log(err)
    })
  }
  formatDate(date: any): string {
  return new Date(date).toLocaleDateString();
}

  openBuyModal(id: any) {
    this.selectedPropertyId = id;
    console.log(this.selectedPropertyId ,"selected d")
    this.showBuyModal = true;
  }
  async submitBuy(){
    const payload = {
  name: sessionStorage.getItem("firstName"),
  email: this.buyForm.value.email,
  mobile: this.buyForm.value.mobile,
  paymentMethod: this.buyForm.value.paymentMethod,
  transactionId: this.buyForm.value.transactionId,
  buyerId:this.userid
};
    this.buyerService.buyProperty( this.selectedPropertyId,payload).subscribe((res:any)=>{
      console.log(res)
      alert("Property Purchased Successfully")
      this.getApprovedProperties()
    })
   this.showBuyModal = false;
    this.buyForm.reset();
  }
   closeModal() {
    this.showBuyModal = false;
    this.buyForm.reset();
  }
  getDarkMode(){
    this.NavbarService.darkTheme$.subscribe((res)=>{
      console.log(res)
  this.isDarkMode=res
    })
   }
}


