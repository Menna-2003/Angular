import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { StaticProductService } from 'src/app/Services/static-product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  CurrentProductId: number = 0;
  PrevProductId: number = 0;
  NexProductId: number = 0;
  product: IProduct | null = null;
  productIdsList: number[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private staticProductService: StaticProductService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    //~ Usage of snapshot: This code uses the snapshot property of ActivatedRoute to access the route parameter pid.
    //~ Synchronous Access: It retrieves the parameter once when the component is initialized and does not listen for any changes. It assumes that the parameter will not change during the component's lifecycle.
    // this.CurrentProductId = Number(
    //   this.activatedRoute.snapshot.paramMap.get('pid')
    // );

    // this.product = this.staticProductService.getProductById(
    //   this.CurrentProductId
    // );

    //& Usage of subscribe: This code uses paramMap.subscribe() to observe changes to the route parameters.
    //& Asynchronous Access: It listens for changes in the route parameters. Whenever the paramMap changes, the callback function is triggered
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.CurrentProductId = Number(paramMap.get('pid'));
      this.product = this.staticProductService.getProductById(
        this.CurrentProductId
      );
    });

    this.productIdsList = this.staticProductService.getProductIds();
  }

  GoBack() {
    this.location.back();
  }
  Previous() {
    let currentIndex = this.productIdsList.findIndex(
      (e) => e == this.CurrentProductId
    );
    console.log(currentIndex);
    if (currentIndex > 0) {
      this.PrevProductId = this.productIdsList[currentIndex - 1];
      this.router.navigate(['/Products', this.PrevProductId]);
    } else this.PrevProductId = currentIndex;
  }
  Next() {
    let currentIndex = this.productIdsList.findIndex(
      (e) => e == this.CurrentProductId
    );
    let lastIndex = this.productIdsList[this.productIdsList.length - 1];
    console.log(currentIndex);
    if (currentIndex >= 0 && currentIndex < lastIndex) {
      this.NexProductId = this.productIdsList[currentIndex + 1];
      this.router.navigate(['/Products', this.NexProductId]);
    } else this.NexProductId = currentIndex;
  }
}
