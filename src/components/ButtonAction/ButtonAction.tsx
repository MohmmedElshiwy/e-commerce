"use client"
import React, { useContext } from 'react'
import { Button } from '../ui/button'
import { addToCart } from '@/CartActions/Action'
import { toast } from 'sonner';
import { CartContext } from '@/context/CartContext';
import type {CartContextType} from "@/context/CartContext"


export default function ButtonAction({id}:{id:string}) {

  const {numberOfItems,setNumberOfItems} = useContext(CartContext) as CartContextType

    async function checkToAdd (id:string) {
        
       const res=await addToCart(id)
      //  console.log(res);
       if(res.status === "success"){
        toast.success("Product Added Succefully")
        setNumberOfItems(numberOfItems +1)
       }else{
        toast.error("Can't Add this Product Right Now")
       }
    }

  return <>
  
        <Button onClick={()=> checkToAdd(id)} className=" cursor-pointer w-full">Add to Cart</Button>

  </>
}
