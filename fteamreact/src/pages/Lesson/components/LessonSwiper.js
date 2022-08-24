// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../style/LessonSwiper.scss';

// import required modules
import { Navigation } from 'swiper';

import { Link } from 'react-router-dom';
import '../style/Lesson.css';
// map彈跳視窗
import LessonConfirmAlert from './LessonConfirmAlert';
// 三個座標
const center = [
  { lat: 25.041851651290155, lng: 121.55534122649684 },
  { lat: 25.031099292075666, lng: 121.46450972649664 },
  { lat: 24.155632861663089, lng: 120.65585056881044 },
];
// 三個店名
const lessonClassName = [
  'HRC 舞蹈工作室【台北忠孝館】',
  'HRC 舞蹈工作室【板橋民生旗艦館】',
  'HRC 舞蹈工作室【台中精誠館】',
];
export default function LessonSwiper() {
  return (
    <>
      <Swiper
        shortSwipes={false}
        loop={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper "
      >
        <SwiperSlide>
          <div className=" cooler_lesson_computer cooler_lesson_background h-100  d-flex flex-wrap  justify-content-around  ">
            <div className="w-40 h-95 cooler_lesson_class shadowblack">
              <div className="h-40">
                <img src="./imgs/lesson_imgs/l01.jpg" className="" alt="..." />
              </div>
              <div className="h-60 p-3">
                <div className="h-25 ">
                  <h4 className=" text-center h-40 fw-bold">HRC 舞蹈工作室</h4>
                  <h5 className=" text-center h-30 fw-bold">【台北忠孝館】</h5>
                </div>
                <div className="h-15 d-flex ">
                  <div className="w-15 coolermap d-inline-block">
                    <LessonConfirmAlert
                      center={center[0]}
                      lessonClassName={lessonClassName[0]}
                    />
                  </div>
                  <div className=" w-75 fs-6 fw-bold">
                    <p className="h-100 d-flex align-items-center">
                      國父紀念館
                    </p>
                  </div>
                </div>
                <div className="h-55">
                  <p className=" h-75 ">
                    HRC舞蹈工作室提供最優質的舞蹈教學服務，每月超過三百堂多樣化課程、數十種舞蹈風格，多元的課程選擇、由淺入深的漸進式學習，讓你輕鬆踏出舞蹈的第一步，打穩基礎、深根學習、挑戰自己！
                  </p>
                  <div className="h-35 w-100 d-flex justify-content-end">
                    <div className="w-25">
                      <Link
                        to={'/lesson/lesson_zhongxiao'}
                        className="cooler-btn"
                      >
                        Go
                      </Link>
                    </div>
                  </div>
                </div>

                {/* <Link to={'/lesson/lesson_zhongxiao'} className=" ">
                    Go
                  </Link> */}
              </div>
            </div>

            <div className="w-40 h-95 cooler_lesson_class shadowblack">
              <div className="h-40">
                <img src="./imgs/lesson_imgs/l02.jpg" className="" alt="..." />
              </div>
              <div className="h-60 p-3">
                <div className="h-25 ">
                  <h4 className=" text-center h-40 fw-bold">HRC 舞蹈工作室</h4>
                  <h5 className=" text-center h-30 fw-bold">
                    【板橋民生旗艦館】
                  </h5>
                </div>
                <div className="h-15 d-flex ">
                  <div className="w-15 coolermap d-inline-block">
                    <LessonConfirmAlert
                      center={center[1]}
                      lessonClassName={lessonClassName[1]}
                    />
                  </div>
                  <div className=" w-75 fs-6 fw-bold">
                    <p className="h-100 d-flex align-items-center">新埔站</p>
                  </div>
                </div>
                <div className="h-55">
                  <p className=" h-75 ">
                    HRC舞蹈工作室提供最優質的舞蹈教學服務，每月超過三百堂多樣化課程、數十種舞蹈風格，多元的課程選擇、由淺入深的漸進式學習，讓你輕鬆踏出舞蹈的第一步，打穩基礎、深根學習、挑戰自己！
                  </p>
                  <div className="h-35 w-100 d-flex justify-content-end">
                    <div className="w-25">
                      <Link
                        to={'/lesson/lesson_banqiao'}
                        className="cooler-btn"
                      >
                        Go
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="cooler_lesson_computer cooler_lesson_background h-100  d-flex flex-wrap  justify-content-around  ">
            <div className="w-40 h-95 cooler_lesson_class shadowblack">
              <div className="h-40">
                <img src="./imgs/lesson_imgs/l02.jpg" className="" alt="..." />
              </div>
              <div className="h-60 p-3">
                <div className="h-25 ">
                  <h4 className=" text-center h-40 fw-bold">HRC 舞蹈工作室</h4>
                  <h5 className=" text-center h-30 fw-bold">
                    【板橋民生旗艦館】
                  </h5>
                </div>
                <div className="h-15 d-flex ">
                  <div className="w-15 coolermap d-inline-block">
                    <LessonConfirmAlert
                      center={center[1]}
                      lessonClassName={lessonClassName[1]}
                    />
                  </div>
                  <div className=" w-75 fs-6 fw-bold">
                    <p className="h-100 d-flex align-items-center">新埔站</p>
                  </div>
                </div>
                <div className="h-55">
                  <p className=" h-75 ">
                    HRC舞蹈工作室提供最優質的舞蹈教學服務，每月超過三百堂多樣化課程、數十種舞蹈風格，多元的課程選擇、由淺入深的漸進式學習，讓你輕鬆踏出舞蹈的第一步，打穩基礎、深根學習、挑戰自己！
                  </p>
                  <div className="h-35 w-100 d-flex justify-content-end">
                    <div className="w-25">
                      <Link
                        to={'/lesson/lesson_banqiao'}
                        className="cooler-btn"
                      >
                        Go
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-40 h-95 cooler_lesson_class shadowblack">
              <div className="h-40">
                <img src="./imgs/lesson_imgs/l03.jpg" className="" alt="..." />
              </div>
              <div className="h-60 p-3">
                <div className="h-25 ">
                  <h4 className=" text-center h-40 fw-bold">HRC 舞蹈工作室</h4>
                  <h5 className=" text-center h-30 fw-bold">【台中精誠館】</h5>
                </div>
                <div className="h-15 d-flex ">
                  <div className="w-15 coolermap d-inline-block">
                    <LessonConfirmAlert
                      center={center[2]}
                      lessonClassName={lessonClassName[2]}
                    />
                  </div>
                  <div className=" w-75 fs-6 fw-bold">
                    <p className="h-100 d-flex align-items-center"></p>
                  </div>
                </div>
                <div className="h-55">
                  <p className=" h-75 ">
                    HRC舞蹈工作室提供最優質的舞蹈教學服務，每月超過三百堂多樣化課程、數十種舞蹈風格，多元的課程選擇、由淺入深的漸進式學習，讓你輕鬆踏出舞蹈的第一步，打穩基礎、深根學習、挑戰自己！
                  </p>
                  <div className="h-35 w-100 d-flex justify-content-end">
                    <div className="w-25">
                      <Link
                        to={'/lesson/lesson_taichung'}
                        className="cooler-btn"
                      >
                        Go
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
