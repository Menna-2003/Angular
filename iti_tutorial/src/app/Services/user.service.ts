import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../Models/iuser';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getUserData(token: string): Observable<IUser> {
    return this.httpClient.get<IUser>(
      `${environment.APIUrl}/Users/${token}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  addUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(
      `${environment.APIUrl}/Users`,
      JSON.stringify(user, this.httpOptions)
    );
  }

  editUserData(newUser: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(`${environment.APIUrl}/Users/${newUser.token}`, newUser, {
      headers: this.httpOptions.headers,
      observe: 'body'
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
