import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class StaticProductService {
  private productList: IProduct[];

  constructor() {
    this.productList = [
      {
        id: 0,
        name: 'Product 1',
        price: 100,
        quantity: 10,
        imgURL: 'image1.jpg',
        categoryID: 1,
        categoryName: 'Laptops' // Add categoryName here
      },
      {
        id: 1,
        name: 'Product 2',
        price: 200,
        quantity: 5,
        imgURL: 'image2.jpg',
        categoryID: 2,
        categoryName: 'Mobiles' // Add categoryName here
      },
    ];
    
  }

  getAllProducts(): IProduct[] {
    return this.productList;
  }
  getProductsBuCategoryId(cId: number): IProduct[] {
    if (cId == 0) return this.productList;
    else return this.productList.filter((p) => p.categoryID == cId);
  }
  getProductById(id: number): IProduct | null {
    let product = this.productList.find((p) => p.id == id);
    return product ? product : null;
  }
  DeleteProduct(id: number) {
    this.productList = this.productList.filter((p) => p.categoryID !== id);
  }
  addProduct(product: IProduct) {
    this.productList.push(product);
  }
  getProductIds(): number[] {
    return this.productList.map((p) => p.id);
  }
}
