import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { ProductListComponent } from './Components/home/Products/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LightBoxDirective } from './Directives/light-box.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//& fo angular material  
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { ProductDetailsComponent } from './Components/home/Products/product-details/product-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { UserRegisterComponent } from './Components/user-register/user-register.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component'; // Import MatSnackBarModule

import { MatIconModule } from '@angular/material/icon';
import { OrderMasterComponent } from './Components/home/Products/order-master/order-master.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SideBarComponent,
    ProductListComponent,
    LightBoxDirective,
    OrderMasterComponent,
    ConfirmDialogComponent,
    NotFoundComponent,
    UserLoginComponent,
    MainLayoutComponent,
    ProductDetailsComponent,
    AddProductComponent,
    UserRegisterComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, //& 2-way-binding
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    FontAwesomeModule,
    HttpClientModule,  //& to deal with APIs
    ReactiveFormsModule, //& to use reactive forms
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
