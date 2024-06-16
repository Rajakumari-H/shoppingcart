import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { Next } from 'react-bootstrap/esm/PageItem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  cartCount: number = 0;
  searchTerm: string;

  constructor(public userServ: UserService, public router: Router, public pdtServ: ProductsService){}

  ngOnInit(): void {

    if(this.userServ.isLoggedUser()){
      this.getCartCount();
    }

    this.pdtServ.updateCart.subscribe({
      next: (data?: any) =>{
        this.getCartCount();
      }
    })
  }

  getCartCount(){
    
    this.pdtServ.getMyCartCount().subscribe({
      next: (data: number) =>{
        this.cartCount = data;
      }, error: (error: any) =>{
        (error)
      }
    })
  }

  doLogout(){
    this.cartCount = 0;
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
