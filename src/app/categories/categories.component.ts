import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  categoryList: any[] = [];

  constructor(public pdtServ: ProductsService){}

  ngOnInit(): void {
    this.pdtServ.getCategories().subscribe({
      next: (categories: any) => {

        (categories);
        this.categoryList = categories;
        (this.categoryList);

      }, error: (error: any) => {

        (error);

      }, complete: () => {

        ('Observalble Completed');

      } 
    });
  }
}
