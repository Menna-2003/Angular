import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { ProductViewModel } from 'src/app/ViewModels/product-view-model';

import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { StaticProductService } from 'src/app/Services/static-product.service';
import { CartService } from 'src/app/Services/cart.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-order-master',
  templateUrl: './order-master.component.html',
  styleUrls: ['./order-master.component.scss'],
})
export class OrderMasterComponent implements OnInit {
  selectedCategoryid: number = 0;
  categoryList: ICategory[];
  receivedOrderTotalPrice: number = 0;
  receivedOrder: ProductViewModel;
  productViewModelList: ProductViewModel[] = [];

  @ViewChild(ProductListComponent) ProductListComponent!: ProductListComponent;

  constructor(
    public dialog: MatDialog,
    private staticProductService: StaticProductService,
    private cart: CartService
  ) {
    this.categoryList = [
      { id: 0, name: 'All', img: "", description: "" },
      { id: 1, name: 'laptops', img: "", description: "" },
      { id: 2, name: 'tablets', img: "", description: "" },
      { id: 3, name: 'mobiles', img: "", description: "" },
    ];
    this.receivedOrder = { product: null, neededQuantity: 0, totalPrice: 0 };
  }
  ngOnInit(): void {
    this.productViewModelList = this.cart.getCart()
  }

  ResetCategories() {
    this.selectedCategoryid = 0;
  }

  onTotalPriceChange(totalPrice: number) {
    this.receivedOrderTotalPrice = this.cart.getTotalPrice()
  }

  onRecievedChanges(pdViewModel: ProductViewModel) {
    console.log(this.productViewModelList)
    this.productViewModelList.push(pdViewModel);
  }

  DeleteFromCart(productViewModel: ProductViewModel) {
    console.log(this.productViewModelList);

    this.productViewModelList = this.productViewModelList.filter(
      (p) => p.product?.id != productViewModel.product?.id
    );

    console.log(this.productViewModelList);
  }

  PlaceOrder() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    // console.log(this.ProductListComponent?.productList);
    // debugger;

    let productList = this.staticProductService.getAllProducts();

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productViewModelList.forEach((e) => {
          const product = productList.find(
            (p) => p.id == e.product?.id
          );
          if (product) {
            product.quantity -= e.neededQuantity;
          }
        });

        while (this.productViewModelList.length != 0)
          this.productViewModelList.pop();
      } else {
        console.log('Order canceled');
      }
    });
  }
}
