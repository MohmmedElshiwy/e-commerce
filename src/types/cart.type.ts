export interface CartItemType {
  _id: string;
  count: number;
  price: number;
  product: {
    id: string;
    title: string;
    imageCover: string;
  };
}

export interface CartRes {
  status: string
  numOfCartItems: number
  cartId: string
}