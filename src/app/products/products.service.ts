import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiServer: string = environment.server;

  constructor(public http: HttpClient, public userSer: UserService) { }

  // updateCart = new EventEmitter();
 
  updateCart = new Subject();
  // updateCart = new BehaviorSubject('default value');



  getCategories(){
    return this.http.get<any[]>('http://localhost:3000/getcategories');
  }

  getProductList(){
     return this.http.get<any[]>('http://localhost:3000/listproducts');
  }

  // getMyCart(){
  //   return this.http.get<any[]>('http://localhost:3000/mycart', 
  //   {
  //     headers: new HttpHeaders({
  //       'myauthtoken': this.userSer.getMyToken()
  //     })
  //   }
  // )
  // }

  getMyCart(){
       return this.http.get<any[]>('http://localhost:3000/mycart');
  }

  addNewProducts(data: any){
        return this.http.post<string>('http://localhost:3000/addproducts', data);
  }

  getpdtCatwise(catId: string){
        return this.http.get<any[]>('http://localhost:3000/getpdtcatwise/'+catId);
  }

  addToMyCart(pdtId: number, pdtPrice:number){
    const reqBody = {cartPdtId: pdtId, cartPdtPrice: pdtPrice}

       return this.http.post<string>('http://localhost:3000/addtocart', reqBody)
  }

  getMyCartCount(){
    return this.http.get<number>('http://localhost:3000/cartcount')
  }

  updateMyCartItems(cartId: number, cartPdtQty: number, pdtPrice: number){
    return this.http.put<string>('http://localhost:3000/updatecart', {cartId: cartId, cartPdtQty: cartPdtQty, pdtPrice: pdtPrice}) 
  }

  removeMyCartItem(cartId: number) {
    return this.http.delete<string>('http://localhost:3000/removecart/' + cartId);
  }
}
