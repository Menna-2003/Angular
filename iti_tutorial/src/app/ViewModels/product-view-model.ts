import { IProduct } from '../Models/iproduct';

export interface ProductViewModel {
  product: IProduct| null;
  neededQuantity: number;
  totalPrice: number;
}
