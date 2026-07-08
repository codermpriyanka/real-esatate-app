import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {

  constructor(private http:HttpClient) { }

  addProperty(property:any){
    return this.http.post('https://real-estate-backend-zdip.onrender.com/api/property/add-property',property)
     }
     getAllProperties(){
      return this.http.get('https://real-estate-backend-zdip.onrender.com/api/property/get-all-properties')
     }
     getPropertyById(id:any){
      return this.http.get('https://real-estate-backend-zdip.onrender.com/api/property'+'/'+id)
     }
     updateProperty(id:any,data:any){
      return this.http.put('https://real-estate-backend-zdip.onrender.com/api/property/update-property'+'/'+id,data)
     }
     deleteProperty(id:any,data:any){
      return this.http.delete('https://real-estate-backend-zdip.onrender.com/api/property/delete-property'+'/'+id,data)
     }
    
}
