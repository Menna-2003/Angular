import { Component, OnInit } from '@angular/core';
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
  dialog: any;
  snackBar: any;

  constructor(private cartService: CartService, private productService: ProductsService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(c => {
      this.Cart = c;
    })
  }

  // AddToCart(product: ProductViewModel) {
  //   this.Cart.push(product);
  // }

  // DeleteFromCart(productViewModel: ProductViewModel) {
  //   console.log(this.Cart);

  //   this.Cart = this.Cart.filter(
  //     (p) => p.product?.id != productViewModel.product?.id
  //   );

  //   console.log(this.Cart);
  // }


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
