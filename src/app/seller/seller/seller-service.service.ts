import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {

  constructor(private http:HttpClient) { }

  addProperty(property:any){
    return this.http.post('http://localhost:3000/api/property/add-property',property)
     }
     getAllProperties(){
      return this.http.get('http://localhost:3000/api/property/get-all-properties')
     }
     getPropertyById(id:any){
      return this.http.get('http://localhost:3000/api/property'+'/'+id)
     }
     updateProperty(id:any,data:any){
      return this.http.put('http://localhost:3000/api/property/update-property'+'/'+id,data)
     }
     deleteProperty(id:any,data:any){
      return this.http.delete('http://localhost:3000/api/property/delete-property'+'/'+id,data)
     }
    
}
