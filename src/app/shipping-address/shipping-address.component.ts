import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {
  idCart:any;
  constructor(private _ActivateRoute:ActivatedRoute,private _CartService:CartService)
  {

  }
  ngOnInit(): void {
this._ActivateRoute.paramMap.subscribe(
  (params)=>this.idCart = params.get('id')
)
  }
  shippingForm:FormGroup = new FormGroup({
    details:new FormControl(null),
    phone:new FormControl(null),
    city:new FormControl(null),
  })
  RedirectToPage(url:string)
  {
    window.location.href = url;
  }
  handleShippingData(shippingForm:FormGroup){
    console.log(shippingForm.value)
    console.log(this.idCart)
    this._CartService.payCart(this.idCart,shippingForm.value).subscribe({
      next:(Response)=>{console.log(Response.session.url)
        this.RedirectToPage(Response.session.url)}
    })
  }
}

