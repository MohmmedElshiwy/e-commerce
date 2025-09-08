"use client";

import { getLogedUserCart } from "@/CartActions/getUserAction";
import { CartItemType } from "@/types/cart.type";

import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

export  interface CartContextType {
  numberOfItems: number;
  setNumberOfItems: Dispatch<SetStateAction<number>>;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  async function getUserCart() {
    try {
      const res = await getLogedUserCart();

      if (res?.status === "success") {
        let sum = 0;
        let total = 0;

        res.data.products.forEach((item: CartItemType) => {
          sum += item.count;
          total += item.count * item.price;
        });

        setNumberOfItems(sum);
        setTotalPrice(total);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfItems, setNumberOfItems, totalPrice, setTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}