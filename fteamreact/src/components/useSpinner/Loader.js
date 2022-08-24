import React from 'react';
import { Autoplay } from 'swiper';
import { EffectCube } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import './Loader.scss';
// 圖片陣列
const datas = [
  { src: '../../imgs/Logoin/Rectangle.png' },
  { src: '../../imgs/Logoin/cfbcff9f1af9abea43111d2f52f342fc.jpg' },
  { src: '../../imgs/Logoin/cf8d25ed01695253f9e3a81ecc2a108b.jpg' },
];

const Loader = ({ loading = false }) => {
  return (
    <>
      <div
        className="col-12 LoaderBox"
        style={{ display: loading ? 'block' : 'none' }}
      >
        <div
          className="col-4 col-xl-2 LoaderKidBox"
          // style={{ display: loading ? 'block' : 'none' }}
        >
          <Swiper
            speed={500}
            grabCursor={false}
            loop={true}
            spaceBetween={0}
            slidesPerView={1}
            modules={[EffectCube, Autoplay]}
            effect="cube"
            autoplay={{
              delay: 500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
          >
            {datas.map((data) => (
              <SwiperSlide key={data.src}>
                <img
                  className="w-100"
                  style={{
                    objectFit: 'cover',
                    height: '50%',
                  }}
                  src={data.src}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Loader;
