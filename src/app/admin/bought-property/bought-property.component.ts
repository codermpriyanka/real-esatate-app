import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../admin-dashboard/admin-dashboard.service';

@Component({
  selector: 'app-bought-property',
  templateUrl: './bought-property.component.html',
  styleUrls: ['./bought-property.component.css']
})
export class BoughtPropertyComponent implements OnInit {

  constructor(private adminService:AdminDashboardService) { }
  allPropertyData:any[]=[];
  boughtPropertyData:any[]=[]
  ngOnInit() {
  this.getPropertiesData()
  }
tableColumns=[
  {key:'name',label:'Property Name'},
  {key:'address',label:'Property Address'},
  {key:'price',label:'Property Price'},
   {key:'addedBy',label:'Added By'},
    {key:'addedOn',label:'Added On'},
    {key:'propertyBoughtStatus',label:'Bought Status'}
               
]
  getPropertiesData() {
  this.adminService.getPropertyList().subscribe((res:any)=>{
    console.log(res)
    this.allPropertyData=res.data
    this.boughtPropertyData=this.allPropertyData.filter(item=>item.propertyBoughtStatus === 'bought')
 console.log(this.boughtPropertyData ,"bouht Property Data")
  })
  }

  formatDate(date: any): string {
  return new Date(date).toLocaleDateString();
}

}
