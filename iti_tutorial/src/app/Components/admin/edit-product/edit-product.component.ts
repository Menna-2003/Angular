import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: IProduct = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    imgURL: '',
    categoryID: 0,
    categoryName: '',
  };

  categoryList: ICategory[] = []

  constructor(private productService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.productService.getCategories().subscribe((c) => {
      this.categoryList = c.filter(c => c.id != 0);
    })

    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe((product: IProduct) => {
      this.product = product;
    });
  }

  EditProduct() {
    this.productService.editProduct(this.product).subscribe(() => {
      this.router.navigate(['/Products']);
    });
  }
}
