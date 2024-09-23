import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExistEmailValidator } from 'src/app/CustomValidators/existEmailValidator';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {

  isUserLogged: boolean = false;
  username: string = '';
  password: string = '';
  loginForm: FormGroup;
  existUserEmails: string[] = [];

  constructor(private formBuilder: FormBuilder, private authService: UserAuthService, private router: Router, private userService: UserService) {
    // call API to fill user emails, or better send the email to the server and get the response
    this.existUserEmails = [
      'menna@gmail.com',
      'menna2@gmail.com',
      'menna3@gmail.com',
      'menna4@gmail.com',
    ]
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ExistEmailValidator(this.existUserEmails), Validators.email]],
      password: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged;
  }

  get Email() {
    return this.loginForm.get('email');
  }
  get Password() {
    return this.loginForm.get('password');
  }

  login() {
    this.authService.login(this.Email?.value, this.Password?.value);
    this.authService.getLoggedStatus().subscribe((status) => {
      this.isUserLogged = status;
      this.router.navigate(['/Home']);
    });
  }

  logout() {
    this.authService.logout();
    this.authService.getLoggedStatus().subscribe((status) => {
      this.isUserLogged = status;
    });
  }
}
