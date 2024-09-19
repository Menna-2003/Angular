import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IProduct } from '../Models/iproduct';
import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';
import { ICategory } from '../Models/icategory';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  addProduct(newProduct: IProduct): Observable<IProduct> {
    // return this.httpClient.post<IProduct>(`${environment.APIUrl}/Products`, JSON.stringify(newProduct, this.httpOptions));
    return this.httpClient.post<IProduct>(
      `${environment.APIUrl}/Products`,
      JSON.stringify(newProduct, this.httpOptions) // to send the data as string
    );
    //~ optional
    // .pipe(retry(3), catchError(this.handleError));
  }
  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.APIUrl}/Products`);
  }
  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(
      `${environment.APIUrl}/Products/${id}`
    );
  }
  getCategoryById(id: number): Observable<ICategory> {
    return this.httpClient.get<ICategory>(
      `${environment.APIUrl}/categories/${id}`
    );
  }
  getCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${environment.APIUrl}/categories`);
  }
  getProductsByCategoryId(cId: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      `${environment.APIUrl}/Products?categoryID=${cId}`
    );
  }
  editProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.put<IProduct>(`${environment.APIUrl}/Products/${product.id}`, product, {
      headers: this.httpOptions.headers,
      observe: 'body'
    }).pipe(
      catchError(this.handleError)
    );
  }

  DeleteProduct(id: number) {
    const url = `${environment.APIUrl}/Products/${id}`;
    return this.httpClient.delete(url, this.httpOptions).pipe(
      retry(2), // Optionally retry if there's a failure
      catchError(this.handleError) // Handle error
    );
  }

  getFourProductByCategoryID(cId: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.APIUrl}/Products?categoryID=${cId}`)
      .pipe(
        map(products => products.slice(0, 4))
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
