import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ListproductsComponent } from './products/listproducts/listproducts.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { SearchproductComponent } from './searchproduct/searchproduct.component';



const routes: Routes = [
  { path: '', component: ListproductsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'category', redirectTo: '/', pathMatch:'full'},
  {path: 'viewproduct', component: ViewProductComponent},
  {path: 'category/:catid', component: ListproductsComponent},
  {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'search', component: SearchproductComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
