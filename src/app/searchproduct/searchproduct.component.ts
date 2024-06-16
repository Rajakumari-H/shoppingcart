import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchproduct',
  templateUrl: './searchproduct.component.html',
  styleUrl: './searchproduct.component.css'
})
export class SearchproductComponent implements OnInit{
  searchTerm: any;
  msg: string;
  isLoading: boolean;
  errormsg: string;
  searchedProduct: any[] = [];

constructor(public prodServ: ProductsService, public toaster: ToastrService, public activateRoute: ActivatedRoute){}

ngOnInit(): void {
  this.activateRoute.queryParams.subscribe(({ search }) => {
    this.prodServ.getProductList().subscribe((data: any[]) => {
      this.searchedProduct = data.filter((x) =>
        x.pdtName.toLowerCase().includes(search.toLowerCase())
      );
      this.isLoading = false;
      if(this.searchedProduct.length == 0){
        this.errormsg = 'Product Not Found';
      }
    });
  });
}

  addToCart(pdtId: number, pdtPrice:number){
    this.prodServ.addToMyCart(pdtId, pdtPrice).subscribe({
      next: (data: string) => {

          // this.msg = data;
            this.toaster.success(data);
          (this.msg, 'error');
          this.prodServ.updateCart.next('event emitted');
      }, error: (error: any) => {
        (error);
        // this.msg = 'Something Went Wrong!';
        this.toaster.error('Something Went Wrong!')
      }
    })
  }

}
