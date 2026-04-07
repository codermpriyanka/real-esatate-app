import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {NavbarService} from'../../core/navbar/navbar.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  properties:any[]=[]
  messages:any[]=[]
  isDarkMode:boolean=false;
  constructor(private firestore:AngularFirestore,private NavbarService:NavbarService) { }

  ngOnInit() {
    this.getProperties()
    this.getContactMessage()
    this.getDarkMode()
  }
  getProperties() {
    this.firestore.collection('properties').snapshotChanges().subscribe((res: any) => {
      this.properties = res.map((e: any) => {
        const data = e.payload.doc.data();
        const id = e.payload.doc.id;
        return { id, ...data };
      });
    });
  }
  async approveProperty(id: string) {
    await this.firestore.collection('properties').doc(id).update({
      status: 'approved'
    });
  
    alert("Property Approved");
  }

getContactMessage(){
this.firestore.collection('messages',ref=>ref.orderBy('date','desc')
).snapshotChanges().subscribe(res=>{
  this.messages = res.map((e: any) => {
    const data = e.payload.doc.data();
    const id = e.payload.doc.id;
    return { id, ...data };
})
})
  }

  async clickToRead(id:string){
    await this.firestore.collection('messages').doc(id).update({
      status:'Read'
    })
  }

    
getDarkMode(){
  this.NavbarService.darkTheme$.subscribe((res)=>{
  console.log(res)
  this.isDarkMode=res
  })
  }
}
