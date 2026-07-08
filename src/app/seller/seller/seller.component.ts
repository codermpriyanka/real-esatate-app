import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NavbarService} from'../../core/navbar/navbar.service';
import { SellerServiceService } from './seller-service.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  propertyForm:FormGroup
 selectedFacilities: string[] = [];
  isDarkMode:boolean=false;
  previewUrl: any;
  openEditModal:boolean=false;
  selectedId:any
  showForm:boolean=false
  allProperties:any[]=[]
  properties:any[]=[];

  constructor(private NavbarService:NavbarService,private sellerService:SellerServiceService) { }

  ngOnInit() {
    this.propertyForm=new FormGroup({
      propertyName:new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z0-9\\- ]+$')]),
      address:new FormControl('',[Validators.required, Validators.pattern('^[A-Za-z0-9,./\\- ]+$')]),
      price:new FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),
      facilities:new FormControl([]),
      photo:new FormControl(null,Validators.required)
    })
  this.getAllPropertiesRecord()
  }
resetForm(){
  this.openEditModal=false;
  this.selectedId=null;
  this.propertyForm.reset();
  this.selectedFacilities=[];
  this.previewUrl=null;
  this.getAllPropertiesRecord()
}
tableColumns=[
  {key:'name',label:'Name'},
  {key:'address',label:'Address'},
  {key:'price',label:'Price'},
  {key:'facilities',label:'Facilities'},
  {key:'addedBy',label:'Added By'},
  {key:'addedOn',label:'Added On'}
]
  async onSubmit(){
    console.log("Facilities from form:", this.propertyForm.value.facilities);
console.log(
  "Facilities JSON:",
  JSON.stringify(this.propertyForm.value.facilities)
);
  const formData = new FormData();
    formData.append(
  'name',
    this.propertyForm.value.propertyName
  );
  formData.append(
    'address',
    this.propertyForm.value.address
  );
  formData.append(
    'price',
    this.propertyForm.value.price
  );

  formData.append(
    'facilities',
      JSON.stringify(this.propertyForm.value.facilities)
    
  );

  formData.append(
    'addedBy',
    sessionStorage.getItem('firstName') || ''
  );

  formData.append(
    'addedById',
    sessionStorage.getItem('userid') || ''
  );

  if (this.propertyForm.value.photo) {
    formData.append(
      'photos',
      this.propertyForm.value.photo
    );
  }
  console.log('selectedId =', this.selectedId);
   if(this.selectedId){
    this.sellerService.updateProperty(this.selectedId,formData).subscribe((res)=>{
      console.log(res)
      alert("Property updated successfully")
      this.resetForm()
      this.getAllPropertiesRecord()
    })
   }else{
 this.sellerService.addProperty(formData).subscribe((res)=>{
    console.log(res)
        alert("Property Added Successfully")
         this.resetForm()
    this.getAllPropertiesRecord()
   },err=>{
    console.log(err)
   })
   }
    this.showForm=false;
    console.log(this.propertyForm.value.photo); 
  }
  deleteButton(data:any){
    this.selectedId=data._id
this.sellerService.deleteProperty(this.selectedId,data).subscribe((res)=>{
console.log(res)
alert("Property Deleted Successfully")
 this.getAllPropertiesRecord()
},(err)=>{
  console.log(err)
})
  }
onFacilityChange(event:any){
  if(event.target.checked){
    this.selectedFacilities.push(event.target.value)
  } else{
     this.selectedFacilities =
      this.selectedFacilities.filter(x => x !== event.target.value);
  }
  this.propertyForm.patchValue({
    facilities:this.selectedFacilities
  })

}
  getAllPropertiesRecord(){
    this.sellerService.getAllProperties().subscribe((res:any)=>{
      console.log(res)
      this.allProperties=res.data
      this.properties=res.data
       this.allProperties.forEach(item => {
      console.log('Facilities:', item.facilities);
      console.log('Type:', typeof item.facilities);
    });
    })
  }
formatDate(date: any): string {
  return new Date(date).toLocaleDateString();
}
cancelAddProperty(){
  this.showForm=false;
}
  filterProperties(){
 
  }
  editButton(data:any){
this.openEditModal=true;
  if (
    Array.isArray(data.facilities) &&
    data.facilities.length === 1 &&
    data.facilities[0].includes(',')
  ) {
    this.selectedFacilities = data.facilities[0].split(',');
  } else {
    this.selectedFacilities = data.facilities || [];
  }
this.selectedId=data._id
 this.propertyForm.patchValue({
   propertyName:data.name,
      address:data.address,
      price:data.price,
      facilities:data.facilities,
      photo:data.photo
 })
 this.previewUrl=data.photos ?'https://real-estate-backend-zdip.onrender.com/uploads/'+data.photos :'';
 this.selectedFacilities=data.facilities || [];
 console.log(this.selectedFacilities ,"selected facili")
  }  

  updateSubmit(){

  }

  closeModal(){
    this.openEditModal=false;
  }
  
 
onFileChange(event: any) {
  const file = event.target.files[0];

  if (file) {

    this.propertyForm.patchValue({
      photo: file
    });

    const reader = new FileReader();

    reader.onload = () => {
      this.previewUrl = reader.result;
    };

    reader.readAsDataURL(file);
  }
} 
 getDarkMode(){
  this.NavbarService.darkTheme$.subscribe((res)=>{
    console.log(res)
this.isDarkMode=res
  })
 }

}
