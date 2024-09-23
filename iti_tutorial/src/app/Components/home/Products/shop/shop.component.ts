import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  categoryList: ICategory[] = []
  selectedCategoryid: number = 0;
  minPrice = 0;
  maxPrice = 100000;

  constructor(private ProductsService: ProductsService, private activatedRoute: ActivatedRoute, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('categoryId');
      if (id) {
        this.selectedCategoryid = +id;
      }
    });
   }

  ngOnInit(): void {
    this.ProductsService.getCategories().subscribe(categories => {
      this.categoryList = categories;
    });
  }

  onchange() {
    console.log("min", this.minPrice)
    console.log("max", this.maxPrice)
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

}
