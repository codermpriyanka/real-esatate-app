import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerComponent } from './buyer/buyer.component';
import { RouterModule, Routes } from '@angular/router';
import { BuyerPurchaseComponent } from './buyer/buyer-purchase/buyer-purchase.component';

const routes:Routes=[
  {path:'buyer-dashboard',component:BuyerComponent},
  {path:'buyer-purchase',component:BuyerPurchaseComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes) 
  ],
  exports:[RouterModule]
})
export class BuyerRoutingModule { }
