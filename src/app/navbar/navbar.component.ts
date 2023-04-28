import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  numCartItems:number=0;
  isLogin:boolean = false;
  constructor(private _AuthService:AuthService, private _CartService:CartService)
  {

    _CartService.numCartItems.subscribe({
      next:(data)=>this.numCartItems  = data,
    });
    _AuthService.useData.subscribe({
      next:()=>{
        if(_AuthService.useData.getValue()!== null)
        {
          this.isLogin = true;
        }
        else{
          this.isLogin = false;
        }
      }
    })
  }
  logOut()
  {
    this._AuthService.logOut();
  }

}
