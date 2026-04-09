import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagePropertyComponent } from './manage-property/manage-property.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path:'',component:AdminDashboardComponent},
  {path:'property',component:ManagePropertyComponent,canActivate:[AuthGuard],data:{role:'admin'}},
  {path:'users',component:ManageUsersComponent,canActivate:[AuthGuard],data:{role:'admin'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
