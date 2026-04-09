import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller/seller.component';
import { AuthGuard } from '../auth.guard';
const routes:Routes=[
  {path:'seller-dashboard',component:SellerComponent,canActivate:[AuthGuard],data:{role:'seller'}}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SellerRoutingModule { }
