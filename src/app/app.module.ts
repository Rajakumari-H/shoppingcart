import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { ListproductsComponent } from './products/listproducts/listproducts.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './token-interceptor.service';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { ToastrModule } from 'ngx-toastr';
import { SearchproductComponent } from './searchproduct/searchproduct.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesComponent,
    ListproductsComponent,
    FooterComponent,
    LoginComponent,
    ViewProductComponent,
    PageNotFoundComponent,
    SearchproductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
