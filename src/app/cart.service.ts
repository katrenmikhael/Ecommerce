import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  numCartItems = new BehaviorSubject(0);
  constructor(private _HttpClient:HttpClient) {
    this.getCart().subscribe({
      next:(Response)=>this.numCartItems.next(Response.numOfCartItems),
      error:(err)=>console.log(err)
    })
  }
  header:any = {token:localStorage.getItem("userToken")}


  addToCart(productId:string):Observable<any>
  {
    console.log(this.header);
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/cart`,{productId:productId},{
      headers:this.header,
    })
  }

  getCart():Observable<any>
  {
    console.log(this.header);
    return this._HttpClient.get("https://route-ecommerce.onrender.com/api/v1/cart",{
      headers:this.header,
    })
  }

  updateCart(productId:string, count:number):Observable<any>
  {
    console.log(this.header);
    return this._HttpClient.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{count:count},{
      headers:this.header,
    })
  }
  deleteCartProduct(productId:string):Observable<any>
  {
    return this._HttpClient.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{
      headers:this.header,
    })
  }

  payCart(cartId:string ,shippingAddress:any):Observable<any>
  {
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{shippingAddress:shippingAddress},{
      headers:this.header,
    })
  }

  getAllOrders(userId:string):Observable<any>
  {
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userId}`)
  }
}
