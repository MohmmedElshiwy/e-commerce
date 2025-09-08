"use server"

import { getMytoken } from "@/utilities/getMytoken";

// add 
export async function addToWishList(productId: string) {
    const token = await getMytoken();
        if(!token || typeof token !== "string") { throw new Error("please login to be able to add to cart "); }
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       token
      },
      body: JSON.stringify({ productId }),
    });

    if (!res.ok) throw new Error("Failed to add to wishlist");

    const data = await res.json();
    console.log(data);
    
    return data;
  } catch (err) {
    return { status: "error", message: String(err) };
  }
}



// remove

export async function removeFromWishlist(id:string){

    const token = await getMytoken();
    if(!token || typeof token !== "string"){
        throw new Error("Please login Again")}

        const res = await fetch(`${process.env.API}/wishlist/${id}`,{
            method:"DELETE",
            headers : {
                token: token,
                "Content-Type" : "application/json"
            }
        })
        const payload = await res.json()
        return payload;
    }









// show

export async function showWishList() {
    const token = await getMytoken();
        if(!token || typeof token !== "string") { throw new Error("please login to be able to add to cart "); }
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       token
      },
    });

    if (!res.ok) throw new Error("Failed to add to wishlist");

    const {data} = await res.json();    
    return data;
  } catch (err) {
    return { status: "error", message: String(err) };
  }
}


