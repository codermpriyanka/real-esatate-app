import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-buyer-purchase',
  templateUrl: './buyer-purchase.component.html',
  styleUrls: ['./buyer-purchase.component.css']
})
export class BuyerPurchaseComponent implements OnInit {
  purchases: any[] = [];
  constructor(private firestore:AngularFirestore) { }

  ngOnInit() {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  console.log("Current UID:", user.uid);
  this.firestore.collection('orders', ref =>
    ref.where('email', '==', user.email)
  ).snapshotChanges().subscribe(res => {
    console.log("Raw Firestore Response:", res);
    this.purchases = res.map((e: any) => {
      const data = e.payload.doc.data();
      const id = e.payload.doc.id;
      return { id, ...data };
    });
  });
  }

}
