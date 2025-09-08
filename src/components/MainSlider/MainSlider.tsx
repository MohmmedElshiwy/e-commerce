"use client"
import img1 from "../../../public/images/slider-image-1.jpeg"
import img2 from "../../../public/images/slider-image-2.jpeg"
import img3 from "../../../public/images/slider-image-3.jpeg"
import img4 from "../../../public/images/banner-4.jpeg"
import img5 from "../../../public/images/grocery-banner.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Autoplay } from "swiper/modules"
import Image from "next/image"

export default function MainSlider() {
  return <>
  <div className=" flex">
    <div className="w-3/4 ">
    <Swiper 
      spaceBetween={0}
      slidesPerView={1}
    modules={[Autoplay]}
    autoplay={{delay:2000}}
    >
      <SwiperSlide><Image src={img1} alt="" className="w-full object-cover h-[600]"/> </SwiperSlide>
      <SwiperSlide><Image src={img2} alt="" className="w-full object-cover h-[600]"/></SwiperSlide>
      <SwiperSlide><Image src={img3} alt="" className="w-full object-cover h-[600]"/></SwiperSlide>
      
    </Swiper>
    </div>
    <div className="w-1/4">
        <img src={img4.src} alt="banner" className="w-full object-cover h-[300]" />
        <img src={img5.src} alt="banner" className="w-full object-cover h-[300]" />
    </div>


  </div>
     
  
  </>
  

}
