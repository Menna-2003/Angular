import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductListComponent } from './Components/Order/product-list/product-list.component';
import { OrderMasterComponent } from './Components/Order/order-master/order-master.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { ProductDetailsComponent } from './Components/Order/product-details/product-details.component';
import { AuthGuard } from './Guards/auth.guard';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { TestParameterService } from './Services/test-parameter.service';
import { UserRegisterComponent } from './Components/user-register/user-register.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/Home', pathMatch: 'full' },
      { path: 'Home', component: HomeComponent },
      { path: 'Products', component: ProductListComponent },
      { path: 'Products/Add', component: AddProductComponent },
      { path: 'Products/:pid', component: ProductDetailsComponent, canActivate: [TestParameterService] },
      { path: 'Order', component: OrderMasterComponent, canActivate: [AuthGuard] },
      {
        path: 'User',
        loadChildren: () => import('src/app/Components/user-module/user-module.module').then(m => m.UserModuleModule),
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
