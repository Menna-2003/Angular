import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
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
  maxPrice = 0;

  constructor(private ProductsService: ProductsService) { }

  ngOnInit(): void {
    this.ProductsService.getCategories().subscribe(categories => {
      this.categoryList = categories;
    })
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
