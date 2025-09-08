"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { CategoryType } from "@/types/category.type";
import Image from "next/image";

export default function Category({ data } : { data: CategoryType[] }) {
  return (
    <>
      <h2 className="my-5 text-2xl font-semibold text-center">Category</h2>

      <div className="text-center">
        <Swiper
          spaceBetween={10}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
            1536: {
              slidesPerView: 7,
            },
          }}
        >
          {data.map((cat:CategoryType) => (
            <SwiperSlide key={cat._id} className="p-2">
              <Image
                width={500}
                height={500}
                src={cat.image}
                alt={cat.name}
                className="w-full object-cover h-40 mx-auto"
              />
              <p className="font-bold text-lg mt-2">{cat.name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
