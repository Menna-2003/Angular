import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  categoryList: ICategory[] = [];
  newProduct: IProduct = {} as IProduct;
  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getCategories().subscribe((categories) => {
      this.categoryList = categories;
    });
  }

  addProduct() {
    const observer = {
      next: (product: IProduct) => {
        alert('Product Added Successfully!');
        this.router.navigateByUrl('/Products');
      },
      error: (err: Error) => {
        alert(err.message);
      },
    };

    this.productService.addProduct(this.newProduct).subscribe(observer);
  }
}
