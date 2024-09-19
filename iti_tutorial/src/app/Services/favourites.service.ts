import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  Favourites: IProduct[] = []
  httpOptions: any;

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient, private ProductService: ProductsService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getFavourites(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.APIUrl}/Favourites`);
  }

  addToFavourites(product: IProduct) {

    let exist = this.Favourites.find(p => p.id == product?.id);
    // console.log(exist);
    if (!exist) {
      // this.Favourites.push(product);
      this.AddToFavouritesNotification()

      this.httpClient.post<IProduct>(`${environment.APIUrl}/Favourites`, product, this.httpOptions).subscribe({
        next: (response) => {
          console.log('Product added to favorites successfully', response);
        },
        error: (error) => {
          console.error('Error adding product to favorites', error);
        }
      });

      product.isFavorited = true;
      this.ProductService.editProduct(product).subscribe({
        next: (updatedProduct) => {
          console.log('Product updated successfully:', updatedProduct);
          // alert('Product updated successfully!');
        },
        error: (error) => {
          console.error('Error updating product:', error);
          alert('Error updating product');
        }
      });

    }
    else {
      this.removeFromFavourites(product);
    }
  }

  removeFromFavourites(product: IProduct): Observable<void> {
    // Remove from UI first (optional)
    this.Favourites = this.Favourites.filter(p => p.id !== product.id);
    this.RemovedFromFavouritesNotification();

    // Define a function to update the product
    const updateProduct = () => {
      product.isFavorited = false;
      return this.ProductService.editProduct(product).pipe(
        map(updatedProduct => {
          console.log('Product updated successfully:', updatedProduct);
          // alert('Product updated successfully!');
        }),
        catchError(error => {
          console.error('Error updating product:', error);
          alert('Error updating product');
          return throwError(() => new Error('Error updating product.'));
        })
      );
    };

    // Send a DELETE request to remove the product from the backend
    return this.httpClient.delete<void>(`${environment.APIUrl}/Favourites/${product.id}`, {
      ...this.httpOptions,
      observe: 'response'
    }).pipe(
      switchMap(() => updateProduct()), // Chain the updateProduct observable
      catchError(error => {
        console.error('Error removing product from favorites:', error);
        return throwError(() => new Error('Error removing product from favorites.'));
      })
    );
  }


  private AddToFavouritesNotification() {
    this.snackBar.open(`Product has been added successfully!`, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['AddedToFav'],
    });
  }
  private RemovedFromFavouritesNotification() {
    this.snackBar.open(`Product removed from favourites!`, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['RemovedFromFav'],
    });
  }

}
