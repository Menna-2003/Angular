import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductListComponent } from './Components/home/Products/product-list/product-list.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { ProductDetailsComponent } from './Components/home/Products/product-details/product-details.component';
import { AuthGuard } from './Guards/auth.guard';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { TestParameterService } from './Services/test-parameter.service';
import { UserRegisterComponent } from './Components/user-register/user-register.component';
import { OrderMasterComponent } from './Components/home/Products/order-master/order-master.component';
import { FavouritesComponent } from './Components/home/Products/favourites/favourites.component';
import { CartComponent } from './Components/cart/cart.component';
import { ShopComponent } from './Components/home/Products/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/Home', pathMatch: 'full' },
      { path: 'Home', component: HomeComponent },
      { path: 'Shop', component: ShopComponent },
      { path: 'Products/Add', component: AddProductComponent },
      { path: 'Products/:pid', component: ProductDetailsComponent, canActivate: [TestParameterService] },
      { path: 'Order', component: OrderMasterComponent, canActivate: [AuthGuard] },
      { path: 'Favourites', component: FavouritesComponent, canActivate: [AuthGuard] },
      { path: 'Cart', component: CartComponent, canActivate: [AuthGuard] },
      {
        path: 'User',
        loadChildren: () => import('src/app/Components/user-module/user-module.module').then(m => m.UserModuleModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'Admin',
        loadChildren: () => import('src/app/Components/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard]
      }
    ],
  },
  { path: 'Login', component: UserLoginComponent },
  { path: 'Register', component: UserRegisterComponent },
  { path: 'Logout', component: UserLoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
