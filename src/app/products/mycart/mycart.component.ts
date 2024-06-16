import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrl: './mycart.component.css'
})
export class MycartComponent implements OnInit{

  isDisable: boolean;
  myCartItems: any[] = [];
  cartFinalPrice: number = 0;
  msg: any;

  constructor(public prodSev: ProductsService, public route: Router, public toaster: ToastrService){}

  ngOnInit(): void {
    this.prodSev.getMyCart().subscribe({
      next: (data: any[]) => {
        (data);
        this.myCartItems = data;
        (this.myCartItems);

      }, error: (error: any) => {
        (error);
        if(error === 401){
          localStorage.clear();
          this.route.navigateByUrl('/login');
        }
      }
    })
  }

  updateCart(cartId: number, cartPdtQty: number, pdtPrice: number) {
    this.prodSev.updateMyCartItems(cartId, cartPdtQty, pdtPrice).subscribe({
      next: (data: string) => {

        this.msg = data;

        const index = this.myCartItems.findIndex((obj)=>{
          return obj._id === cartId;
        });

        this.myCartItems[index].cartPdtQty = cartPdtQty;
        this.myCartItems[index].cartPdtPrice = cartPdtQty* pdtPrice;

        this.cartFinalPrice = 0;
        
        for(let cartData of this.myCartItems) {
          this.cartFinalPrice += cartData.cartPdtPrice; // a += b => a = a+b;
        }


      }, error: (error: any) => {

        (error);
        this.msg = "Something went wrong";

      }
    })
  }

  removeCart(cartId: number) {
    this.prodSev.removeMyCartItem(cartId).subscribe({
      next: (data: string) => {

        // this.msg = data;
         this.toaster.success(data);
        
        if(confirm('Are you sure want to delete this?')){
          this.myCartItems = this.myCartItems.filter((obj)=>{
            return obj._id !== cartId;
          });
 
          this.prodSev.updateCart.next('');
        
        }

       

        this.cartFinalPrice = 0;
        for(let cartData of this.myCartItems) {
          this.cartFinalPrice += cartData.cartPdtPrice; // a += b => a = a+b;
        }

      },  error: (error: any) => {

        (error);
        this.msg = "Something went wrong";

      }
    })
  }



}
