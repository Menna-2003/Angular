import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductViewModel } from 'src/app/ViewModels/product-view-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaticProductService } from 'src/app/Services/static-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';
import { FavouritesService } from 'src/app/Services/favourites.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnChanges {
  orderTotalPrice: number = 0;
  product: any;
  // count:number=0;
  productsByCategory: IProduct[] = [];

  @Input() sentSelectedCategoryID: number = 0;
  @Input() minPrice: number = 0;
  @Input() maxPrice: number = 0;
  @Output() totalPriceChanged: EventEmitter<number>;
  @Output() productToSend: EventEmitter<ProductViewModel>;
  @ViewChild('itemsCount') itemsCount!: ElementRef;

  constructor(
    // private staticProductService: StaticProductService,
    private ProductService: ProductsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private cart: CartService,
    private FavouritesService: FavouritesService
  ) {
    this.totalPriceChanged = new EventEmitter<number>();
    this.productToSend = new EventEmitter<ProductViewModel>();

    this.route.paramMap.subscribe(params => {
      const id = params.get('categoryId');
      if (id) {
        this.sentSelectedCategoryID = +id;
      }
    });
  }

  ngOnChanges(): void {
    if (this.maxPrice != 0 && this.maxPrice > this.minPrice) {
      if (this.sentSelectedCategoryID == 0) {
        this.ProductService.getAllProducts().subscribe((products) => {
          let p = products.filter(p => p.price > this.minPrice && p.price < this.maxPrice);
          if (p.length > 0)
            this.productsByCategory = p;
          else {
            this.NoProductsFoundNotification("No Products Found, Try other filters")
            this.ProductService.getAllProducts().subscribe((products) => {
              this.productsByCategory = products;
              console.log("max", this.maxPrice, " min", this.minPrice)
              if (this.maxPrice == 0) this.maxPriceNotification("You must specify maximum price for the filtration!");
              if (this.maxPrice < this.minPrice) this.minMax("Maximum price should be larger than minimum price");
            });
          }
        });
      }
      else {
        this.ProductService.getProductsByCategoryId(this.sentSelectedCategoryID).subscribe((products) => {
          let p = products.filter(p => p.price > this.minPrice && p.price < this.maxPrice);
          if (p.length > 0) {
            this.productsByCategory = p
          }
          else {
            this.NoProductsFoundNotification("No Products Found, Try other filters")
            this.ProductService.getAllProducts().subscribe((products) => {
              this.productsByCategory = products;
              console.log("max", this.maxPrice, " min", this.minPrice)
              if (this.maxPrice == 0) this.maxPriceNotification("You must specify maximum price for the filtration!");
              if (this.maxPrice < this.minPrice) this.minMax("Maximum price should be larger than minimum price");
            });
          }
        });
      }
    }
    else {
      this.ProductService.getAllProducts().subscribe((products) => {
        this.productsByCategory = products;
        // if (this.maxPrice == 0) this.maxPriceNotification("You must specify maximum price for the filtration!");
        if (this.maxPrice < this.minPrice) this.minMax("Maximum price should be larger than minimum price");
      });
    }
  }

  ngOnInit(): void {
    // this.productsByCategory = this.staticProductService.getAllProducts();
    this.ProductService.getAllProducts().subscribe((products) => {
      this.productsByCategory = products;
    });
  }

  Buy(price: number, count: any, id: number, itemsCount: any) {
    // debugger;
    // let Quantity = Number(count)
    // let product = this.ProductService.getProductById(id);

    // let itemsCountt: number = Number(itemsCount);

    // if (product) {

    //   product.subscribe(product => {
    //     // itemsCountt <= product?.quantity &&
    //     if (Quantity > 0) {
    //       // this.showAddToCartNotification(product?.name || 'Product');
    //       this.showAddToCartNotification('Product added successfully');

    //       // this.orderTotalPrice += Number(count) * price;
    //       let productViewModel: ProductViewModel = {
    //         product: product,
    //         neededQuantity: Quantity,
    //         totalPrice: this.orderTotalPrice,
    //       };

    //       // this.totalPriceChanged.emit(this.orderTotalPrice);
    //       // this.productToSend.emit(productViewModel);

    //       // this.cart.addToCart(productViewModel);

    //     } else {
    //       this.InvalidQuantityNotification(product?.name || 'Product');
    //     }
    //   })

    // }

    // itemsCount.value = '';
  }

  AddToFavourites(product: IProduct) {
    product.isFavorited = !product.isFavorited;

    const observer = {
      next: (product: IProduct) => {
        console.log('Product Added Successfully!');
        this.ProductService.editProduct(product).subscribe(p => { })
      },
      error: (err: Error) => {
        alert(err.message);
      },
    };

    this.FavouritesService.addToFavourites(product).subscribe(observer);
    this.FavouritesService.getFavourites().subscribe(f => {
      console.log(f)
    })
  }

  LoadProducts(): void {
    this.ProductService.getAllProducts().subscribe({
      next: (products) => {
        this.productsByCategory = products
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
      }
    });

  }

  private InvalidQuantityNotification(productName: string) {
    this.snackBar.open(
      `You must specify quantity for  ${productName} `,
      'Close',
      {
        duration: 5000, // Duration in milliseconds
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar'],
      }
    );
  }

  private CategoryNotification(message: string) {
    this.snackBar.open(
      `${message}`,
      'Close',
      {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['custom-snackbar'],
      }
    );
    console.log(message)
  }
  private minMax(message: string) {
    this.snackBar.open(
      `${message}`,
      'Close',
      {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['custom-snackbar'],
      }
    );
  }
  private maxPriceNotification(message: string) {
    this.snackBar.open(
      `${message}`,
      'Close',
      {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['custom-snackbar'],
      }
    );
    console.log(message)
  }
  private NoProductsFoundNotification(message: string) {
    this.snackBar.open(
      `${message}`,
      'Close',
      {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['custom-snackbar'],
      }
    );
    console.log(message)
  }

  ProductsTrackByFunction(index: number, product: IProduct): number {
    return product.id;
  }
}
