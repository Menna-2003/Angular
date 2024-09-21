import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';
import { ProductViewModel } from 'src/app/ViewModels/product-view-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  Cart: ProductViewModel[] = []
  snackBar: any;

  constructor(private cartService: CartService, private productService: ProductsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(c => {
      this.Cart = c;
    })
  }

  RemoveProduct(product: ProductViewModel) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: "Are you sure you want to remove this product?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.RemoveFromCart(product).subscribe(() => {
          this.cartService.getCart().subscribe(c => {
            this.Cart = c;
          })
        })
      } else {
        console.log('Order canceled');
      }
    });


  }

  // PlaceOrder() {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent);

  //   let productList = this.productService.getAllProducts();

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.Cart.forEach((e) => {
  //         const product = productList.find(
  //           (p) => p.id == e.product?.id
  //         );
  //         if (product) {
  //           product.quantity -= e.neededQuantity;
  //         }
  //       });

  //       while (this.Cart.length != 0)
  //         this.Cart.pop();
  //     } else {
  //       console.log('Order canceled');
  //     }
  //   });
  // }
}
