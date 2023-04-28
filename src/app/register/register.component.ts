import { Component } from '@angular/core';
import {FormGroup , FormControl,Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  constructor(private _AuthService:AuthService,private _Router:Router)
  {
    if(localStorage.getItem("userToken") !== null)
    {
      this._Router.navigate(["/home"]);
    }
  }
  isLoading:boolean = false;
  errorMsg:string = '';
  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required , Validators.email]),
    password:new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    rePassword:new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    phone:new FormControl(null,[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },{validators: this.passwordMAtch});

  passwordMAtch(registerForm:any)
  {
    let passwordControl = registerForm.get('password');
    let rePasswordControl = registerForm.get('rePassword');
    if(passwordControl?.value === rePasswordControl?.value)
    {
      return null;
    }
    else{
      rePasswordControl?.setErrors({repasswordMatch:'repassword donot match'});
      return {repasswordMatch:'repassword donot match'};
    }
  }
  handelRegister(registerForm:FormGroup)
  {


    this.isLoading = true;

    if(registerForm.valid)
    {
      this._AuthService.register(registerForm.value).subscribe({
        next:(Response)=>
        {
          this.isLoading = false;
          if(Response.message ==='success')
          {
            this._Router.navigate(["/login"]);
          }
        },
        error:(error)=>
        {
          this.isLoading = false;
          this.errorMsg = error.error.errors.msg;
        }
      })
    }
  }
}
