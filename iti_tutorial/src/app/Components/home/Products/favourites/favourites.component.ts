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

  constructor(private favouritesService: FavouritesService) {
    this.favouritesService.getFavourites().subscribe(fav => {
      this.favourites = fav;
    })
  }

  RemoveFromFavourites(product: IProduct) {
    this.favouritesService.removeFromFavourites(product).subscribe({
      next: () => {
        // Optionally reload favorites or update UI after successful removal
        this.LoadFavourits();
      },
      error: (error) => {
        console.error('Error removing product from favorites:', error);
      }
    });
  }

  LoadFavourits(): void {
    this.favouritesService.getFavourites().subscribe({
      next: (products) => {
        this.favourites = products.filter(p => p.isFavorited == false); // Example logic to filter favorites
        console.log("favourits: ", this.favourites);
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
      }
    });

  }
}
