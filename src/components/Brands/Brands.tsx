"use client";

import { getBrands } from "@/api/brands";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Brands } from "@/types/brands";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "@/app/products/loading";

export default function AllBrands() {
  const [brands, setBrands] = useState<Brands[]>([]);
    const [loading, setLoading] = useState(false);


  async function fetchBrands() {
    setLoading(true)
  try{
  const data = await getBrands();
    setBrands(data);
  }catch(err){
    toast.error(String(err))
  }finally{
    setLoading(false)
  }
  }

  useEffect(() => {
    fetchBrands();
  }, []);
  if (loading) return <Loading />;

  return (
    <div className="p-8">
      <h1 className="text-center text-main text-3xl font-bold my-5">All Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Card key={brand._id} className="flex flex-col h-full hover:shadow-main ">
            <div className="relative w-full h-48 ">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-center">{brand.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
