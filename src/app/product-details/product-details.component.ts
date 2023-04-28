import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  idProduct:string|null = '';
  productDetails:any;
constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService, private _CartService:CartService)
{

}
ngOnInit(): void {

this._ActivatedRoute.paramMap.subscribe((params)=>{
  this.idProduct = params.get('id');
})

this._ProductService.getProductDetails(this.idProduct).subscribe({
  next:(Response)=>{

    this.productDetails = Response.data;
  }
})
}

addToCart(productId:string)
{
  console.log(productId);
  this._CartService.addToCart(productId).subscribe({
    next:(Response)=>this._CartService.numCartItems.next(Response.numOfCartItems),
    error:(err)=>console.log(err)
  })
}

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },

  },
  nav: true
}
}

