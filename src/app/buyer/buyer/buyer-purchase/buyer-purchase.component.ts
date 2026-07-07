import { Component, OnInit } from '@angular/core';
import { BuyerServiceService } from '../buyer-service.service';


@Component({
  selector: 'app-buyer-purchase',
  templateUrl: './buyer-purchase.component.html',
  styleUrls: ['./buyer-purchase.component.css']
})
export class BuyerPurchaseComponent implements OnInit {
  purchases: any[] = [];
  properties:any[]=[]
  userid:any
  constructor(private buyerService:BuyerServiceService) { }

  ngOnInit() {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  console.log("Current UID:", user.uid);
 this.myPurchasedProperty()

 console.log(this.userid ,"user id")
  }
 tableColumns=[
  {key:'name',label:'Property'},
  {key:'price',label:'Price'},
  {key:'addedOn',label:'Date'},
  {key:'propertyBoughtStatus',label:'Status'}
 ]
 myPurchasedProperty() {
   this.userid=sessionStorage.getItem("userid")
 console.log(this.userid ,"userr")
    this.buyerService.myPurchasedProperty(this.userid).subscribe((res:any)=>{
      console.log(this.userid ,"userr")
      console.log(res ,"my bought property")
      this.purchases=res.data
      this.properties=res.data
    },err=>{
      console.log(err)
    })
  }
  formatDate(date: any): string {
  return new Date(date).toLocaleDateString();
}


}
