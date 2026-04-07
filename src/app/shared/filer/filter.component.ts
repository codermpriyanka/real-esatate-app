  import { Component, Input, OnInit, Output } from '@angular/core';
  import { EventEmitter } from '@angular/core';
  import { BehaviorSubject } from 'rxjs';
  import * as XLSX from 'xlsx';
  import * as jsPDF from 'jspdf';
  import 'jspdf-autotable';
  import {NavbarService} from'../../core/navbar/navbar.service';

  @Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
  })
  export class FilerComponent implements OnInit {
  @Input() tableData :any[]=[]
  @Output() filteredData=new EventEmitter<any[]>()
  selectedField:string=''
  searchedText:string=''
  isDarkMode:boolean=false
  isLoading:boolean=false;
    constructor(private NavbarService:NavbarService) { }

    ngOnInit() {
      this.getDarkMode()
    }
    filterData(){
      const text=this.searchedText.toLowerCase().trim()
    if(!text){
      this.filteredData.emit(this.tableData)
      return;
    }
    const filtered=this.tableData.filter(item=>{
      if(!this.selectedField){
        return Object.values(item).some(val=>
          val.toString().toLowerCase().includes(text)
        )
      }
          
      const value=item[this.selectedField]
      if(Array.isArray(value)){
          return value.join(',').toLowerCase().includes(text)
      }
      return value.toString().toLowerCase().includes(text)
    })
    this.filteredData.emit(filtered)
  }


  exportToExcel(){
    this.isLoading=true;
   try{
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tableData);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    XLSX.writeFile(workbook, 'properties.xlsx');
   } catch(err){
    console.error(err)
   } finally{
    this.isLoading=false;
   }
  }
  exportToPDF() {
    this.isLoading=true;
try{
  const doc = new (jsPDF as any)();
      const tableData = this.tableData.map((p, i) => [
        i + 1,
        p.propertyName,
        p.address,
        p.price,
        p.facilities ? p.facilities.join(',') : '',
        p.date,
        p.time
      ]);
    
      (doc as any).autoTable({
        head: [['Sl No','Name','Address','Price','Facilities','Date','Time']],
        body: tableData
      });
      doc.save('properties.pdf');
}catch(err){
  console.error(err)
}finally{
  this.isLoading=false;
}
  }
  getDarkMode(){
    this.NavbarService.darkTheme$.subscribe((res)=>{
    console.log(res)
    this.isDarkMode=res
    })
    }
  }
