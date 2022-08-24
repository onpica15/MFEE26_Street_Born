import React, { useEffect } from 'react';
import './Home.css';
import HomeSwiper from './HomeSwiper';

const Home = ({ setHomeBg }) => {
  useEffect(() => {
    setHomeBg(true);
    return () => {
      setHomeBg(false);
    };
  }, []);
  return (
    <>
      <div className="home-bg w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area d-none d-md-block col-10 pb-5 pe-5 text-danger">
          <HomeSwiper />
        </div>

        <div className="work-area d-block d-md-none col-10 text-danger  ">
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center ">
            <div className=" w-100 h-100 HomeMbo02"></div>
          </div>
          <div className="w-100 vh-100 HomeMbo03"></div>
          <div className="w-100 vh-100 HomeMbo04"></div>
          <div className="w-100 vh-100 HomeMbo05"></div>
          <div className="w-100 vh-100 HomeMbo06"></div>
          <div className="w-100 vh-100 HomeMbo07"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
