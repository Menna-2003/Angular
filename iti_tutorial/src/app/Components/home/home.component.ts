import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { StoreData } from 'src/app/Models/store-data';
import { ProductsService } from 'src/app/Services/products.service';
import { PromotionAdsService } from 'src/app/Services/promotion-ads.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // storeData: StoreData;
  // isImageShown: boolean = true;

  Categories: ICategory[] = [];
  Products: IProduct[] = []
  selectedCategoryid: number = 0;

  constructor(private promotionAds: PromotionAdsService, private ProductService: ProductsService, private router: Router) { }

  ngOnInit(): void {

    this.ProductService.getAllProducts().subscribe((products) => {
      this.Products = products;
    });

    this.ProductService.getCategories().subscribe((categories) => {
      this.Categories = categories.filter(c => c.id != 0);
    });

    // let observer = {
    //   next: (data: string) => {
    //     console.log(data);
    //   },
    //   error: (err: string) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log('Ads finished');
    //   },
    // };
    // this.promotionAds.getScheduledAds(3).subscribe(observer);
  }


  selectCategory(categoryId: number) {
    this.selectedCategoryid = categoryId;
    this.router.navigate(['/Shop', categoryId]);
  }


  // ToggleImage() {
  //   this.isImageShown = !this.isImageShown;
  // }
}
