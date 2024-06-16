import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit {

  msg: string;

  getByIdData: any[] = [];
  getByAllData:any[] = [];

  constructor(private pdtSer : ProductsService,private activateRoute : ActivatedRoute, public toaster: ToastrService){}

  ngOnInit(): void {
  this.activateRoute.queryParams.subscribe(({_id,pdtCatId})=>{
    this.getByProductAll(_id,pdtCatId);
  })
  }

  getByProductAll(_id:string,pdtCatId:string){
    this.pdtSer.getProductList().subscribe({
      next: (data: any[]) =>{
        this.getByIdData = data.filter(val=> val._id == _id);
        this.getByAllData = data.filter(x=>x.pdtCatId == pdtCatId && x._id != _id)
      }
     })
  }




  addToCart(pdtId: number, pdtPrice:number){
    this.pdtSer.addToMyCart(pdtId, pdtPrice).subscribe({
      next: (data: string) => {

          // this.msg = data;
          this.toaster.success(data);
          (this.msg, 'error');
          this.pdtSer.updateCart.next('event emitted');
      }, error: (error: any) => {
        (error);
        // this.msg = 'Something Went Wrong!';
        this.toaster.error('Something Went Wrong!');
      }
    })
  }

}
