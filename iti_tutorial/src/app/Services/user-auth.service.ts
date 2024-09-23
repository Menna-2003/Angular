import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../Models/iuser';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private isLoggedSubject: BehaviorSubject<boolean>;

  constructor(private userService: UserService, private router: Router) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(false);
  }

  Register(user: IUser) {
    // call login API, and get access token
    let userToken = user.email.slice(0, 3) + user.password.slice(0, 3);
    user.token = userToken
    user.id = userToken
    this.userService.addUser(user).subscribe(() => {
      localStorage.setItem('token', userToken);
      this.isLoggedSubject.next(true);
      this.router.navigate(['/Home']);
    })

  }

  login(username: string, password: string) {
    // call login API, and get access token

    let userToken = username.slice(0, 3) + password.slice(0, 3);
    this.userService.getUserData(userToken).subscribe(
      userData => {
        if (userData) {
          localStorage.setItem('token', userToken);
          this.isLoggedSubject.next(true);
        }
        else {
          this.router.navigate(['/Register']);
        }
      },
      (error) => {
        this.router.navigate(['/Register']);
        console.error('Error logging in:', error);
      })
  }
  logout() {
    localStorage.removeItem('token');
    this.isLoggedSubject.next(false);
  }
  get isUserLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  getLoggedStatus(): Observable<boolean> {
    //! ".asObservable()"   to make it just accessable as observer that can be subscripted and unsubscripted not to use next and other functions that could be insecure
    return this.isLoggedSubject.asObservable();
  }
}
