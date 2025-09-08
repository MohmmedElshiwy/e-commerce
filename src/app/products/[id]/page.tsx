import ButtonAction from '@/components/ButtonAction/ButtonAction';
import Image from 'next/image';
import React from 'react';

export default async function ProductDetails({ params }:{ params: { id: string }}) {
  const { id } = params;

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
    cache: 'no-store'
  });

  const { data } = await res.json();

  if (!data) {
    return <div className="text-center text-red-600">Product not found</div>;
  }

  return (
    <div className="container w-[80%] mx-auto flex flex-col md:flex-row gap-8 my-10 items-center content-center">
      <div className="md:w-1/4 w-full">
        <Image
          width={500}
          height={500}
          src={data.imageCover}
          alt={data.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="md:w-3/4 w-full">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <p className="text-gray-700 mb-4">{data.description}</p>

        <p className="text-2xl font-bold text-main mb-2">Price: {data.price} EGP</p>
        <p className="text-yellow-500 text-xl font-semibold mb-4">
          Rating: {data.ratingsAverage} ⭐
        </p>

        <div className="flex flex-wrap gap-3 mt-5">
       <ButtonAction  id={id}/>
       
        </div>
      </div>
    </div>
  );
}
