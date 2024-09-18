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
        name: 'Laptop',
        price: 10082200,
        quantity: 1,
        imgURL: 'https://picsum.photos/150/70',
        categoryID: 1,
      },
      {
        id: 1,
        name: 'playstation',
        price: 600000,
        quantity: 0,
        imgURL: 'https://picsum.photos/150/70',
        categoryID: 2,
      },
      {
        id: 2,
        name: 'smart phone',
        price: 1.0,
        quantity: 2,
        imgURL: 'https://picsum.photos/150/70',
        categoryID: 3,
      },
      {
        id: 3,
        name: 'smart phone2',
        price: 12022,
        quantity: 50,
        imgURL: 'https://picsum.photos/150/70',
        categoryID: 3,
      },
      {
        id: 4,
        name: 'PC',
        price: 800,
        quantity: 1330.56,
        imgURL: 'https://picsum.photos/150/70',
        categoryID: 1,
      },
      {
        id: 5,
        name: 'PC2',
        price: 200,
        quantity: 0,
        imgURL: 'https://picsum.photos/150/70',
        categoryID: 1,
      },
      {
        id: 6,
        name: 'playstation',
        price: 5660000,
        quantity: 15,
        imgURL: 'https://picsum.photos/150/70',
        categoryID: 2,
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
