"use client";
import img1 from "../../../public/images/slider-image-1.jpeg";
import img2 from "../../../public/images/slider-image-2.jpeg";
import img3 from "../../../public/images/slider-image-3.jpeg";
import img4 from "../../../public/images/banner-4.jpeg";
import img5 from "../../../public/images/grocery-banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay } from "swiper/modules";
import Image from "next/image";

export default function MainSlider() {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* السلايدر */}
        <div className="w-full lg:w-3/4">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{ delay: 2000 }}
          >
            <SwiperSlide>
              <Image
                src={img1}
                alt="slide-1"
                className="w-full object-cover h-[300px] sm:h-[400px] lg:h-[600px]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={img2}
                alt="slide-2"
                className="w-full object-cover h-[300px] sm:h-[400px] lg:h-[600px]"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={img3}
                alt="slide-3"
                className="w-full object-cover h-[300px] sm:h-[400px] lg:h-[600px]"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* البانرات */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <Image
            src={img4}
            alt="banner-1"
            className="w-full object-cover h-[150px] sm:h-[200px] lg:h-[300px]"
          />
          <Image
            src={img5}
            alt="banner-2"
            className="w-full object-cover h-[150px] sm:h-[200px] lg:h-[300px]"
          />
        </div>
      </div>
    </>
  );
}
