import { Component } from '@angular/core';
import {FormGroup , FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private _AuthService:AuthService,private _Router:Router)
{
  if(localStorage.getItem("userToken") !== null)
  {
    this._Router.navigate(["/home"]);
  }
}
isLoading:boolean = false;
  errorMsg:string = '';
  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required , Validators.email]),
    password:new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  });
  handelLogin(loginForm:FormGroup)
  {
    this.isLoading = true;

    if(loginForm.valid)
    {
      this._AuthService.login(loginForm.value).subscribe({
        next:(Response)=>
        {
          this.isLoading = false;
          if(Response.message ==='success')
          {
            this._Router.navigate(["/home"]);
            // console.log(Response.token);
            localStorage.setItem("userToken",Response.token);

            this._AuthService.decodeToken();
            console.log(Response.token);
          }
        },
        error:(error)=>
        {

          this.isLoading = false;
          // this.errorMsg = error.error.errors.msg;
          console.log(error);
        }
      })
    }
  }
}
