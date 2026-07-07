import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private http:HttpClient) { }

  getPropertyList(){
    return this.http.get('http://localhost:3000/api/property/admin-properties')
  }
  adminApproveProperty(id:any){
    return this.http.put('http://localhost:3000/api/property/approve-property'+'/'+id,{})
  }


}
