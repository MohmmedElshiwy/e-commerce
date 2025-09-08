"use client";
import { ProductsType } from "@/types/products.type";
import Image from "next/image";
import { removeFromWishlist, showWishList } from "@/api/wishlist";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { addToCart } from "@/CartActions/Action";
import { Button } from "../ui/button";
import { CartContext, CartContextType } from "@/context/CartContext";

export default function Wish() {
  const { numberOfItems, setNumberOfItems } = useContext(CartContext) as CartContextType;
  const [products, setProducts] = useState<ProductsType[]>([]);

  // 🟢 أول تحميل يجيب الـ wishlist
  useEffect(() => {
    getWishList();
  }, []);

  async function getWishList() {
    try {
      const data = await showWishList();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }

  // ❌ حذف المنتج + تحديث الـ state
  async function remove(id: string) {
    try {
      const res = await removeFromWishlist(id);
      if (res.status === "success") {
        setProducts((prev) => prev.filter((item) => item.id !== id));
        toast.success("Removed Successfully");
      }
    } catch (err) {
      toast.error(String(err));
    }
  }

  // 🛒 إضافة المنتج للسلة + حذف من الـ wishlist
  async function checkToAdd(id: string) {
    try {
      const res = await addToCart(id);
      if (res.status === "success") {
        setNumberOfItems(numberOfItems + 1);
        toast.success("Product Added Successfully");
        // نشيله من الـ wishlist مباشرة
        setProducts((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error("Can't Add this Product Right Now");
      }
    } catch (err) {
      toast.error(String(err));
    }
  }

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-center text-2xl font-bold my-6">Wish List</h1>

      <div className="bg-gray-50 rounded-lg shadow-sm divide-y">
        {products?.map((item: ProductsType) => (
          <div
            key={item._id}
            className="flex items-center justify-between py-4 px-6"
          >
            {/* الصورة + بيانات المنتج */}
            <div className="flex items-center gap-4">
              <Image
                src={item.imageCover}
                alt={item.title}
                width={100}
                height={100}
                className="object-contain rounded"
              />
              <div>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-green-600 font-bold">{item.price} EGP</p>
                <button
                  onClick={() => remove(item.id)}
                  className="text-red-500 flex items-center gap-1 cursor-pointer mt-1"
                >
                  <i className="fa-solid fa-trash cursor-pointer"></i> Remove
                </button>
              </div>
            </div>

            {/* زر الإضافة للسلة */}
            <div className="flex justify-end">
              <Button
                className="bg-teal-600 hover:bg-main cursor-pointer"
                onClick={() => checkToAdd(item.id)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}

        {/* لو الـ wishlist فاضية */}
        {products.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            Your wishlist is empty 😢
          </p>
        )}
      </div>
    </div>
  );
}
