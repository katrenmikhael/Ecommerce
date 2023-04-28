import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  useData:any = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient,private _Router:Router) {

    if(localStorage.getItem("userToken")!==null)
    {
      this.decodeToken();
    }

   }

   logOut()
   {
     this.useData.next(null);
     localStorage.removeItem("userToken");
     this._Router.navigate(['/login']);
   }
   decodeToken()
   {
     let  encodedData = JSON.stringify(localStorage.getItem("userToken"));
     let decodedData = jwtDecode(encodedData);

     this.useData.next(decodedData);
   }
   register(userData:object):Observable<any>
   {
      return this._HttpClient.post("https://route-ecommerce.onrender.com/api/v1/auth/signup",userData);
   }
   login(userData:object):Observable<any>
   {
      return this._HttpClient.post("https://route-ecommerce.onrender.com/api/v1/auth/signin",userData);
   }
}
