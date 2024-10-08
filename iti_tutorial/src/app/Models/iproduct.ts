export interface IProduct {

    id: number;
    name: string;
    price: number;
    quantity: number;
    imgURL?: string;
    categoryID: number;
    categoryName: string;
    isFavorited: boolean;
}
