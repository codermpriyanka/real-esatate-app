import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyerServiceService {

  constructor(private http:HttpClient) { }
//get api for buy property
  buyerEligbleProperty(){
    return this.http.get('http://localhost:3000/api/property/buyer-properties')
  }

  buyProperty(id:any,data:any){
       return this.http.put('http://localhost:3000/api/property/buy-property'+'/'+id,data)
  }
  myPurchasedProperty(id:any){
return this.http.get('http://localhost:3000/api/property/my-bought-properties'+'/'+id)
  }

}
