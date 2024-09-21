import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnChanges {
  isUserLogged: boolean = false;
  cartItemsCount: number = 0;

  constructor(private authService: UserAuthService, private CartService: CartService) {
    this.isUserLogged = this.authService.isUserLogged;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.LoadCart()
  }

  ngOnInit(): void {
    this.LoadCart()
  }

  LoadCart() {
    this.CartService.getCart().subscribe(c => {
      this.cartItemsCount = c.length
      console.log("Cart Items Count: ", this.cartItemsCount)
    })
  }

  login() {
    this.authService.login('menna', '0000');
    this.authService.getLoggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
  }
  logout() {
    this.authService.logout();
    this.authService.getLoggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
  }
}
