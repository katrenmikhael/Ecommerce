import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { AllordersComponent } from './allorders/allorders.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"home",canActivate:[AuthGuard],component:HomeComponent},
  {path:"cart",canActivate:[AuthGuard],component:CartComponent},
  {path:"shippingAddress/:id",canActivate:[AuthGuard],component:ShippingAddressComponent},
  {path:"allorders",canActivate:[AuthGuard],component:AllordersComponent},

  {path:"productDetails/:id",canActivate:[AuthGuard],component:ProductDetailsComponent},
  {path:"**",component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
