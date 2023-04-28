import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartItems:any;
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next:(Response)=>{this.cartItems = Response.data
      console.log(Response)
      },
      error:(err)=>console.log(err)
    })
  }
  constructor(private _CartService:CartService){

  }

  updateCart(productId:string,count:number)
  {
    if(count == 0)
    {
      this._CartService.deleteCartProduct(productId).subscribe({
        next:(Response)=>{this.cartItems = Response.data;
       this._CartService.numCartItems.next(Response.numOfCartItems)},
        error:(err)=>console.log(err)
      })
    }
    else
    {
      this._CartService.updateCart(productId,count).subscribe({
        next:(Response)=>this.cartItems = Response.data,
        error:(err)=>console.log(err)
      })
    }
  }
}
