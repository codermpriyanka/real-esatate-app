import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagePropertyComponent } from './manage-property/manage-property.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthGuard } from '../auth.guard';
import { CheckMessageComponent } from './check-message/check-message.component';
import { BoughtPropertyComponent } from './bought-property/bought-property.component';

const routes: Routes = [
  {path:'admin-dashboard',component:AdminDashboardComponent},
  {path:'property',component:ManagePropertyComponent},
  {path:'users',component:ManageUsersComponent},
  {path:'check-message',component:CheckMessageComponent},
  {path:'bought-property',component:BoughtPropertyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
