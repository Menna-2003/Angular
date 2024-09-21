import { IProduct } from '../Models/iproduct';

export interface ProductViewModel {
  id: number;
  product: IProduct | null;
  neededQuantity: number;
  totalPrice: number;
}
