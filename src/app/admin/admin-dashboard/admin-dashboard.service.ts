import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private http:HttpClient) { }

  getPropertyList(){
    return this.http.get('https://real-estate-backend-zdip.onrender.com/api/property/admin-properties')
  }
  adminApproveProperty(id:any){
    return this.http.put('https://real-estate-backend-zdip.onrender.com/api/property/approve-property'+'/'+id,{})
  }


}
