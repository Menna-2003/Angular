import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private isLoggedSubject: BehaviorSubject<boolean>;

  constructor() {
    this.isLoggedSubject = new BehaviorSubject<boolean>(false);
  }

  login(username: string, password: string) {
    // call login API, and get access token
    let userToken = '123456789';
    localStorage.setItem('token', userToken);
    this.isLoggedSubject.next(true);
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
