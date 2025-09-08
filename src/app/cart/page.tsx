"use client";

import { getLogedUserCart } from "@/CartActions/getUserAction";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Loading from "../products/loading";
import {
  clearCart,
  removeFromCart,
  updateCartItem,
} from "@/CartActions/Action";
import { toast } from "sonner";
import { CartItemType } from "@/types/cart.type";
import { Button } from "@/components/ui/button";
import { CartContext, CartContextType } from "@/context/CartContext";
import Link from "next/link";

export default function Cart() {
    const {numberOfItems,setNumberOfItems ,totalPrice,setTotalPrice} = useContext(CartContext) as CartContextType
  
  const [products, setProducts] = useState<CartItemType[]>([]);
  const [productId, setProductId] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [disabledItems, setDisabledItems] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  async function getUserCart() {
    const res = await getLogedUserCart();
    if (res.status === "success") {
      console.log(res.data);
      console.log(res.data._id);
      setProducts(res.data.products);
      setProductId(res.data._id)
      setIsLoading(false);
    } else {
      setProducts([]);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  async function removeItem(id: string) {
    try {
      setDisabledItems(true);
      setLoadingItems(true);
      const res = await removeFromCart(id);

      if (res.status === "success") {
        setProducts(res.data.products);
        toast.success("Product Deleted Successfully");
        setDisabledItems(false);
        setLoadingItems(false);
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
      toast.error("Failed to remove product");
      console.error(err);
    } finally {
      setDisabledItems(false);
      setLoadingItems(false);
    }
  }

  async function updatedCart(id: string, count: string) {
  setUpdatingItemId(id);
  setDisabledItems(true)
  setLoadingItems(true)
  try {
    const res = await updateCartItem(id, count);

    if (res.status === "success") {
      setProducts(res.data.products);
        let sum = 0;
        let total = 0;

        res.data.products.forEach((item: CartItemType) => {
          sum += item.count;
          total += item.count * item.price;
        });

        setNumberOfItems(sum);
        setTotalPrice(total);
      toast.success("Product updated Successfully");
        setDisabledItems(false)
        setLoadingItems(false)

    }
  } catch (err) {
    toast.error(String(err));
  } finally {
    setUpdatingItemId(null);
            setDisabledItems(false)
setLoadingItems(false)
  }
}


  async function clearAll() {
    const res = await clearCart();
    console.log(res);

    if (res.message === "success") {
      getUserCart();
      toast.success("Cart cleared Successfully");

        setNumberOfItems(0);
                setTotalPrice(0);

    }
  }
 
  return (
    <>
      {products.length > 0 ? (
        <div className="w-2/3 mx-auto my-10">
          <div className="flex justify-end mb-6">
    <Button
  onClick={clearAll}
  disabled={disabledItems}
  className="bg-red-400 hover:bg-red-600 cursor-pointer 
             disabled:cursor-not-allowed disabled:bg-zinc-400 
             text-white font-medium py-2 px-6 rounded-lg transition-colors"
>
  {disabledItems ? "Clearing..." : "Clear All"}
</Button>
          </div>
        
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: CartItemType) => (
                <tr
                  key={p._id}
                  className="bg-white border-b w-full border-gray-200 hover:bg-gray-100"
                >
                  <td className="p-4">
                    <Image
                      width={300}
                      height={300}
                      src={p.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={p.product.title}
                    />
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {p.product.title}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        disabled={loadingItems}
                        onClick={() =>{
                          updatedCart(p.product.id, String(p.count - 1));
                          setNumberOfItems(numberOfItems -1);
                        }
                        }
                        className="inline-flex items-center disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-light justify-center p-1 me-3 text-sm font-medium h-6 w-6 cursor-pointer text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>

                  {updatingItemId === p.product.id ? (
  <div className="w-14 flex justify-center">
    <span className="fa fa-spinner fa-spin text-gray-600"></span>
  </div>
) : (
  <input
    type="number"
    className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 py-1 text-center"
    value={p.count}
    readOnly
  />
)}

                      <button
                        disabled={loadingItems}
                       onClick={() => {
  updatedCart(p.product.id, String(p.count + 1));
  setNumberOfItems(numberOfItems + 1);
}}

                        className="inline-flex  disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-light items-center justify-center h-6 w-6 cursor-pointer p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                        type="button"
                      >
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {p.price} EGP
                  </td>

                  <td className="px-6 py-4">
                    <button
                      disabled={disabledItems}
                      className="cursor-pointer disabled:bg-zinc-400 bg-red-400 hover:bg-red-600 disabled:cursor-not-allowed text-light py-2 px-6"
                      onClick={() => removeItem(p.product.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
            <div className="my-5  bg-gray-300 w-full p-6 m-auto">
            <h3>Total Price : {totalPrice} Egp</h3>
            <h3>Total Items : {numberOfItems}</h3>
                <Link href={`/checkout/${productId}`}>
                            <Button className="w-full bg-main  hover:bg-green-700 my-5 cursor-pointer">Check Out</Button>
</Link>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl my-12 font-bold text-red-500 text-center">
          No items in cart
        </h1>
      )}
    </>
  );
}
