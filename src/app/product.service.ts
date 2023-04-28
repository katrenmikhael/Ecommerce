import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) {

   }
   getProducts():Observable<any>
   {
    return this._HttpClient.get("https://route-ecommerce.onrender.com/api/v1/products");
   }
   getProductDetails(id:string|null):Observable<any>
   {
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);
   }
   getCategory():Observable<any>
   {
    return this._HttpClient.get("https://route-ecommerce.onrender.com/api/v1/categories");
   }
}
