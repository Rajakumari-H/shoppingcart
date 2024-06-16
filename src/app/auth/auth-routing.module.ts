import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from '../products/add-products/add-products.component';
import { authGuard } from '../auth.guard';
import { MycartComponent } from '../products/mycart/mycart.component';

const routes: Routes = [
 {path: '', children: [
  {path: 'mycart', component: MycartComponent, canActivate: [authGuard]},
  {path: 'add-product', component:AddProductsComponent, canActivate: [authGuard]}
 ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
