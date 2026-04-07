import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagePropertyComponent } from './manage-property/manage-property.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';


const routes: Routes = [
  {path:'',component:AdminDashboardComponent},
  {path:'property',component:ManagePropertyComponent},
  {path:'users',component:ManageUsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
