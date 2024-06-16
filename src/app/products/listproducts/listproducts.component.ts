import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrl: './listproducts.component.css'
})
export class ListproductsComponent implements OnInit, OnDestroy{

  productList: any[] = [];

  isLoading = true;

  msg: string;

  paramsSubscription = new Subscription;


  constructor(public prodServ: ProductsService, public activeroute: ActivatedRoute, public toaster: ToastrService){}

  ngOnInit(): void {
    ('List product Instance created');
    this.paramsSubscription = this.activeroute.params.subscribe({
      next: (param: Params)=>{
        const catId = param['catid'];
        if(catId) {       
          (catId)
          this.getProductCatWise(catId)
        }
        else{
          this.getAllProducts();
        }
      },error: (error: any)=>{
        (error);
      }, complete: () =>{
        ('param subscribtion completed');
      }
    })
   
  }

  getProductCatWise(catId: string){
    this.isLoading = true;
    this.prodServ.getpdtCatwise(catId).subscribe({
      next: (pdtList: any) =>{

        (pdtList);
        this.isLoading = false;
        this.productList = pdtList;

      }, error: (error: any) => {

        (error); 
      }
    });


  }

  getAllProducts(){
    this.isLoading = true;
    this.prodServ.getProductList().subscribe({
      next: (pdtList: any) =>{
        this.isLoading = false;
        this.productList = pdtList;

      }, error: (error: any) => {

        (error); 
      }
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

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
}
