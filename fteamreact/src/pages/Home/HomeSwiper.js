// 參考網址
// https://codesandbox.io/s/wep904?file=/src/App.jsx

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './HomeStyles.css';

// import required modules
import { Pagination, Navigation } from 'swiper';

export default function HomeSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="HomeBg2"></SwiperSlide>
        <SwiperSlide className="HomeBg3"></SwiperSlide>
        <SwiperSlide className="HomeBg4"></SwiperSlide>
        <SwiperSlide className="HomeBg5"></SwiperSlide>
        <SwiperSlide className="HomeBg6"></SwiperSlide>
        <SwiperSlide className="HomeBg7"></SwiperSlide>
      </Swiper>
    </>
  );
}
