import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import {NavbarService} from'../../core/navbar/navbar.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  propertyForm:FormGroup
  isDarkMode:boolean=false;
  selectedFile: File | null = null;
  base64Image: string = '';
previewUrl: any = null;
  showForm:boolean=false;
  facilities:string[]=[]
  properties:any[]=[]
  allProperties:any=[]
  searchText:string=''
  user:any;
  editMode:boolean=false;
  editId:string='';
  constructor(private firestore:AngularFirestore,private NavbarService:NavbarService) { }

  ngOnInit() {
    this.propertyForm=new FormGroup({
      propertyName:new FormControl(''),
      address:new FormControl(''),
      price:new FormControl(''),
    })
    this.getProperties()
    this.user= JSON.parse(sessionStorage.getItem('user') || '{}') as any;
    console.log(this.user ,"user id")
    this.getDarkMode()
  }


  onFacilityChange(event:any,value:string){
 if(event.target.checked){
  this.facilities.push(value)
 }else{
  this.facilities=this.facilities.filter(f=>f!==value)
 }
  }
  async onSubmit(){
    const now=new Date()
  const data={
    propertyName: this.propertyForm.value.propertyName,
    address: this.propertyForm.value.address,
    price: this.propertyForm.value.price,
    photo:  this.base64Image,
    facilities:this.facilities,
    userId:this.user.uid,
    email:this.user.email,
    status:'Pending',
    date:now.toLocaleDateString(),
    time:now.toLocaleTimeString()
  };
  if(this.editMode){
    await this.firestore.collection('properties').doc(this.editId).update(data)
    alert("Property Updated")
    this.editMode=false;
    this.editId=''
 
  } else{
    data.photo=this.base64Image
    await this.firestore.collection('properties').add(data);
    alert("Proprty Added")
  }
  //storing data to firestore
 
  this.propertyForm.reset()
  this.facilities=[]
  this.base64Image = '';
  this.previewUrl=null
  this.showForm=false;
  this.getProperties()
  }

  getProperties(){
    this.firestore.collection('properties').snapshotChanges().subscribe((res)=>{
     this.allProperties=res.map((e:any)=>{
      const data=e.payload.doc.data();
      const id=e.payload.doc.id;
      return {id,...data}
     })
    this.properties=this.allProperties
    })
  }

  filterProperties(){
    const text= this.searchText.toLowerCase().trim()
    this.properties=this.allProperties.filter(p=>
      p.propertyName.toLowerCase().includes(text) ||
      p.address.toLowerCase().includes(text) ||
      p.price.toLowerCase().includes(text) ||
      p.facilities.join(',').toLowerCase().includes(text)
    )
  }
  editButton(p:any){
this.showForm =true;
this.editMode=true;
this.editId=p.id;
this.propertyForm.patchValue({
  propertyName:p.propertyName,
  address:p.address,
  price:p.price
})
this.facilities = p.facilities || []
this.base64Image = p.photo || '';
this.previewUrl = p.photo || null;
  }  
  async deleteButton(id:string){
    const confirmDelete= confirm("Are You Sure Want to delete ?");
    if(confirmDelete){
      await this.firestore.collection('properties').doc(id).delete()
      alert("Property Deleted")
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 400;   
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
            this.previewUrl = compressedBase64;
            this.base64Image = compressedBase64;
          };
        };
        reader.readAsDataURL(file);
      } else {
        alert('Only images allowed');
      }
    }
  }
 getDarkMode(){
  this.NavbarService.darkTheme$.subscribe((res)=>{
    console.log(res)
this.isDarkMode=res
  })
 }

}
