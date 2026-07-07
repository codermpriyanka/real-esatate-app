import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagePropertyComponent } from './manage-property/manage-property.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CheckMessageComponent } from './check-message/check-message.component';
import { BoughtPropertyComponent } from './bought-property/bought-property.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManagePropertyComponent,
    ManageUsersComponent,
    CheckMessageComponent,
    BoughtPropertyComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule  
  ]
})
export class AdminModule { }
