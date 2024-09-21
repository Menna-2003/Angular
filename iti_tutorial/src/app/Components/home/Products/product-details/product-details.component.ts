import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';
import { StaticProductService } from 'src/app/Services/static-product.service';
import { ProductViewModel } from 'src/app/ViewModels/product-view-model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  CurrentProductId: number = 0;
  CurrentProductCategoryId: number = 0;
  PrevProductId: number = 0;
  NexProductId: number = 0;
  product: IProduct = {} as IProduct;
  neededQuantity: number = 0;
  productVM: ProductViewModel = {} as ProductViewModel
  ProductList: IProduct[] = [];
  // productIdsList: number[] = [];

  QuantityForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ProductService: ProductsService,
    private CartService: CartService,
    private formBuilder: FormBuilder,
  ) {
    this.QuantityForm = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
    });

  }

  get Quantity() {
    return this.QuantityForm.get('quantity');
  }

  ngOnInit(): void {
    //~ Usage of snapshot: This code uses the snapshot property of ActivatedRoute to access the route parameter pid.
    //~ Synchronous Access: It retrieves the parameter once when the component is initialized and does not listen for any changes. It assumes that the parameter will not change during the component's lifecycle.

    // this.CurrentProductId = Number(this.activatedRoute.snapshot.paramMap.get('pid'));
    // this.ProductService.getProductById(this.CurrentProductId).subscribe((product) => {
    //   this.product = product;
    //   this.CurrentProductCategoryId = product.categoryID;

    //   // Now that we have the correct category ID, fetch the related products
    //   this.ProductService.getFourProductByCategoryID(this.CurrentProductCategoryId).subscribe((p) => {
    //     this.ProductList = p;
    //   });
    // });

    //& Usage of subscribe: This code uses paramMap.subscribe() to observe changes to the route parameters.
    //& Asynchronous Access: It listens for changes in the route parameters. Whenever the paramMap changes, the callback function is triggered
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.CurrentProductId = Number(paramMap.get('pid'));
      this.ProductService.getProductById(this.CurrentProductId).subscribe((product) => {
        this.product = product;
        this.productVM.id = this.product.id;
        this.productVM.product = this.product;
        this.CurrentProductCategoryId = product.categoryID;

        // Now that we have the correct category ID, fetch the related products
        this.ProductService.getFourProductByCategoryID(this.CurrentProductCategoryId).subscribe((p) => {
          this.ProductList = p;
        });
      });
    });

    // this.productIdsList = this.staticProductService.getProductIds();
  }

  addProductToCart() {

    this.CartService.getProductById(this.productVM.id).subscribe({
      next: (p) => {
        if (p) {
          this.productVM.id = this.product.id;
          this.productVM.product = this.product;
          this.productVM.neededQuantity = p.neededQuantity;
          this.productVM.neededQuantity += this.QuantityForm.value.quantity;
          this.productVM.totalPrice = this.productVM.neededQuantity * this.product.price;
          this.CartService.UpdateProductQuantity(this.productVM).subscribe({
            next: (updatedProduct) => {
              console.log("Updated Product: ", updatedProduct);
            },
            error: (err) => {
              console.error("Error updating product quantity: ", err);
            }
          });
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.productVM.id = this.product.id;
          this.productVM.product = this.product;
          this.productVM.neededQuantity = this.QuantityForm.value.quantity;
          this.productVM.totalPrice = this.QuantityForm.value.quantity * this.product.price;

          this.CartService.AddToCart(this.productVM).subscribe(newProduct => {
            console.log("Added Product: ", newProduct);
          });
        } else {
          // Handle other errors
          console.error("Error fetching product: ", err);
        }
      }
    });

    // let userModel: IUser = this.userRegisterForm.value as IUser
    // call API, and send user data
    // console.log(userModel)
  }

  onActivate($event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  // GoBack() {
  //   this.location.back();
  // }
  // Previous() {
  //   let currentIndex = this.productIdsList.findIndex(
  //     (e) => e == this.CurrentProductId
  //   );
  //   console.log(currentIndex);
  //   if (currentIndex > 0) {
  //     this.PrevProductId = this.productIdsList[currentIndex - 1];
  //     this.router.navigate(['/Products', this.PrevProductId]);
  //   } else this.PrevProductId = currentIndex;
  // }
  // Next() {
  //   let currentIndex = this.productIdsList.findIndex(
  //     (e) => e == this.CurrentProductId
  //   );
  //   let lastIndex = this.productIdsList[this.productIdsList.length - 1];
  //   console.log(currentIndex);
  //   if (currentIndex >= 0 && currentIndex < lastIndex) {
  //     this.NexProductId = this.productIdsList[currentIndex + 1];
  //     this.router.navigate(['/Products', this.NexProductId]);
  //   } else this.NexProductId = currentIndex;
  // }
}
