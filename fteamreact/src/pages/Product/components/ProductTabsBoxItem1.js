import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from '../commons/axios';
import { Link, NavLink } from 'react-router-dom';

const ProductTabsBoxItem1 = (props) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    adaptiveHeight: true,
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/product/guessULike').then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <>
      <div className="col-12">
        <div className="whoSeeName">
          <h5>Customers who viewed this product also viewed</h5>
        </div>
        <div className="whoSeeImgBox">
          <Slider {...settings}>
            {data.map((r) => {
              return (
                <div key={r.sid}>
                  <NavLink replace to={`/products/details/${r.sid}`}>
                    <img src={`/imgs/Products/${r.img}`} alt="" />
                  </NavLink>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default ProductTabsBoxItem1;
