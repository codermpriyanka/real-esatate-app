import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerComponent } from './buyer/buyer.component';
import { RouterModule, Routes } from '@angular/router';
import { BuyerPurchaseComponent } from './buyer/buyer-purchase/buyer-purchase.component';
import { AuthGuard } from '../auth.guard';

const routes:Routes=[
  {path:'buyer-dashboard',component:BuyerComponent,canActivate:[AuthGuard],data:{role:'buyer'}},
  {path:'buyer-purchase',component:BuyerPurchaseComponent,canActivate:[AuthGuard],data:{role:'buyer'}}
]

@NgModule({ 
  declarations: [],
  imports: [
    RouterModule.forChild(routes) 
  ],
  exports:[RouterModule]
})
export class BuyerRoutingModule { }
