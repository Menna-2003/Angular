import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  isUserLogged: boolean = false;
  constructor(private authService: UserAuthService) {}

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged;
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
