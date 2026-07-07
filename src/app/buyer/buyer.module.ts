import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerComponent } from './buyer/buyer.component';
import { BuyerRoutingModule } from './buyer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuyerPurchaseComponent } from './buyer/buyer-purchase/buyer-purchase.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [BuyerComponent, BuyerPurchaseComponent],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   SharedModule
  ],
  exports:[BuyerComponent]
})
export class BuyerModule { }
