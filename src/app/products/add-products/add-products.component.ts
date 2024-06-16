import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent implements OnInit{

  categories: any[] = [];
  selectedImag: any;
  msg: string;

  constructor(public prodServ: ProductsService){}

  ngOnInit(): void {
    this.prodServ.getCategories().subscribe({
      next: (data: any[]) =>{
        this.categories = data;
      }, error: (error: any) =>{
        (error);
      }
    });
  }

  selectImg(event: any){
    (event);
    this.selectedImag = event.target.files[0];
  }

  createProducts(form: NgForm){
    const formData = new FormData();

    formData.append('pdtCatId', form.value.catId);
    formData.append('pdtName', form.value.pdtName);
    formData.append('pdtPrice', form.value.padtPrice);
    formData.append('pdtDesc', form.value.pdtDesc);

    formData.append('pdtImg', this.selectedImag);


    this.prodServ.addNewProducts(formData).subscribe({
      next: (data: string) =>{
        (data);
        this.msg = data;
        form.reset();
      }, error: (error: any) =>{
        (error);
      }
    })
  
  }

}
