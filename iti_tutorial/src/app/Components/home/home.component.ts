import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
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

  categories: ICategory[] = [];

  constructor(private promotionAds: PromotionAdsService, private productService: ProductsService) {
    // this.storeData = new StoreData('menna', 'https://picsum.photos/300/200', [
    //   'Cairo',
    //   'Alex',
    //   'Assuit',
    // ]);
  }

  ngOnInit(): void {

    this.productService.getCategories().subscribe((category) => {
      this.categories = category;
      console.log("category", category)
      console.log("this.categories",this.categories)
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

  // ToggleImage() {
  //   this.isImageShown = !this.isImageShown;
  // }
}
