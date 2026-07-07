import { Component, OnInit } from '@angular/core';
import {NavbarService} from'../../core/navbar/navbar.service';
import { AdminDashboardService } from './admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isDarkMode:boolean=false;
  allPropertyData:any[]=[];
  properties:any[]=[]
  propertyId:any
  constructor(private NavbarService:NavbarService,private adminService:AdminDashboardService) { }

  ngOnInit() {
    this.getPropertiesData()
    this.getDarkMode()
  }
  tableColumns=[
    {key:'name',label:'Property Name'},
    {key:'address',label:'Property Address'},
    {key:'price',label:'Property Price'},
    {key:'addedBy',label:'Added By'},
    {key:'addedOn',label:'Added On'},
    {key:'verifyStatus',label:'Verify Status'}
  ]
  getPropertiesData() {
  this.adminService.getPropertyList().subscribe((res:any)=>{
    console.log(res)
    this.allPropertyData=res.data
    this.properties=res.data
  })
  }
aprovePropperty(data:any){
  const id=data._id
  this.adminService.adminApproveProperty(id).subscribe((res:any)=>{
    console.log(res)
    if(res.status==200){
alert("Property Approved Successfully.")
this.getPropertiesData()
    }
  },err=>{
    console.log(err)
  })

}

formatDate(date: any): string {
  return new Date(date).toLocaleDateString();
}
     
getDarkMode(){
  this.NavbarService.darkTheme$.subscribe((res)=>{
  console.log(res)
  this.isDarkMode=res
  })
  }
}
