import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

import { AddProductsComponent } from '../products/add-products/add-products.component';
import { MycartComponent } from '../products/mycart/mycart.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MycartComponent,
    AddProductsComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
