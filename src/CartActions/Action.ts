"use server"
import { getMytoken } from "@/utilities/getMytoken";



// add TO Cart
export async function addToCart(id:string){

    const token = await getMytoken();
    if(!token || typeof token !== "string") { throw new Error("please login to be able to add to cart "); }
    const res = await fetch(`${process.env.API}/cart`, {
        method: "POST",
        headers: {
            token: token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ productId: id })
    });
const paylod = await res.json();
return paylod
} 


// remove from cart



export async function removeFromCart(id:string){

    const token = await getMytoken();
    if(!token || typeof token !== "string"){
        throw new Error("Please login Again")}

        const res = await fetch(`${process.env.API}/cart/${id}`,{
            method:"DELETE",
            headers : {
                token: token,
                "Content-Type" : "application/json"
            }
        })
        const payload = await res.json()
        return payload;
    }


    // update cart item quantity
    export async function updateCartItem(id:string , count:string){

        const token = await getMytoken();
        if(!token || typeof token !== "string"){
            throw new Error("Please login Again")}
            const res = await fetch(`${process.env.API}/cart/${id}`,{
                method:"PUT",
                headers : {
                    token: token,
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({count})
            })
            const payload = await res.json()
            return payload;
            
    }
        
// clear cart
export async function clearCart(){
    const token = await getMytoken();
    if(!token || typeof token !== "string"){
        throw new Error("Please login Again")}
        const res = await fetch(`${process.env.API}/cart`,{
            method:"DELETE",
            headers : {
                token: token,
                "Content-Type" : "application/json"
            }
        })
        const payload = await res.json()
        return payload;
}