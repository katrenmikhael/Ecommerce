import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent {
  orders:any;
constructor(private _AuthService:AuthService, private _CartService:CartService){
  _AuthService.useData.subscribe(
    {
      next:(data:any)=>{_CartService.getAllOrders(data.id).subscribe({
        next:(Response)=>{this.orders = Response;
        console.log(Response[0].cartItems[0].product)},
        error:(err)=>{console.log(err)}


      })
      }
    }

  )

}
}
