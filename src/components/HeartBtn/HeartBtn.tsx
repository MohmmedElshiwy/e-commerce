"use client";
import { addToWishList, removeFromWishlist } from "@/api/wishlist";
import { ProductsType } from "@/types/products.type";
import React, { useState } from "react";
import { toast } from "sonner";

export default function HeartBtn({ product }: { product: ProductsType }) {
  const [heart, setHeart] = useState(false);

  const handleClick = async () => {
    try {
      if (!heart) {
        // لو مش متضاف يضيف
        const data = await addToWishList(product.id);
        if (data.status === "success") {
          toast.success("Added To Wishlist Successfully");
          setHeart(true);
        } else {
          toast.error("Can't Add this Product Right Now");
        }
      } else {
        // لو متضاف يشيله
        const data = await removeFromWishlist(product.id);
        if (data.status === "success") {
          toast.success("Removed From Wishlist");
          setHeart(false);
        } else {
          toast.error("Can't Remove this Product Right Now");
        }
      }
    } catch (err) {
      toast.error(err ? "Login First": String(err) );
    }
  };

  return (
    <i
      className={`fa-solid text-2xl cursor-pointer ${
        heart ? "fa-heart text-red-600" : "fa-heart-broken"
      }`}
      onClick={handleClick}
    ></i>
  );
}
