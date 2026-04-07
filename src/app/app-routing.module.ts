import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {path:'login',loadChildren:()=>import('./pages/pages.module').then(m=>m.PagesModule)},
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'seller',loadChildren:()=>import('./seller/seller.module').then(m=>m.SellerModule)},
  {path:'buyer',loadChildren:()=>import('./buyer/buyer.module').then(m=>m.BuyerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
