import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { FavouritesService } from 'src/app/Services/favourites.service';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {

  favourites: IProduct[] = [];

  constructor(private favouritesService: FavouritesService, private ProductService: ProductsService) {
    this.favouritesService.getFavourites().subscribe(fav => {
      this.favourites = fav;
    })
  }

  RemoveFromFavourites(product: IProduct) {
    product.isFavorited = !product.isFavorited;

    this.favouritesService.removeFromFavourites(product).subscribe({
      next: () => {
        console.log('Product removed!');
        this.ProductService.editProduct(product).subscribe();
        this.favouritesService.getFavourites().subscribe(f => {
          this.favourites = f;
        })
      },
      error: (err: Error) => {
        alert(err.message);
      },
    });
  }

  // LoadFavourits(): void {
  //   this.favouritesService.getFavourites().subscribe({
  //     next: (products) => {
  //       this.favourites = products.filter(p => p.isFavorited == true);
  //       console.log("favourits: ", this.favourites);
  //     },
  //     error: (error) => {
  //       console.error('Error loading favorites:', error);
  //     }
  //   });

  // }
}
