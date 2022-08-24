import React from 'react';
import { Autoplay } from 'swiper';
import { EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';

// 圖片陣列 方便map用
const datas = [
  { src: '../../imgs/Logoin/Rectangle.png' },
  { src: '../../imgs/Logoin/cfbcff9f1af9abea43111d2f52f342fc.jpg' },
  { src: '../../imgs/Logoin/cf8d25ed01695253f9e3a81ecc2a108b.jpg' },
];

const LoginCariusel = () => {
  return (
    <>
      <div className="col-xl-6 h-100 LoginCarousel">
        <Swiper
          speed={2000}
          grabCursor={false}
          loop={true}
          spaceBetween={0}
          slidesPerView={1}
          modules={[EffectFade, Autoplay]}
          effect="fade"
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {datas.map((data) => (
            <SwiperSlide key={data.src}>
              <img
                className="w-100"
                style={{
                  objectFit: 'cover',
                  height: 'calc(100vh - 88px)',
                }}
                src={data.src}
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default LoginCariusel;
