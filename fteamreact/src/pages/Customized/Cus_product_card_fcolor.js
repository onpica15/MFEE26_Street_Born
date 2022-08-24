import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Cus_product_card_fcolor.scss';
import axios from 'axios';
import { gsap } from 'gsap';

function Cus_product_card_fcolor(props) {
  const { lastInsertID, setLastInsertID } = props;
  const [frontcolor, setFrontcolor] = useState('#D9D9D9');
  const [originalPrice, setOriginalPrice] = useState(0);
  const [price, setPrice] = useState(0);

  const bgRef = useRef();
  const bgpicRef = useRef();
  const priceRef = useRef();
  const cardRef = useRef();

  //取得價錢//
  useEffect(() => {
    console.log(lastInsertID);
    axios
      .get(`http://localhost:3000/custom/price?sid=${lastInsertID}`)
      .then((res) => {
        console.log('111', res.data[0].price);

        setOriginalPrice(+res.data[0].price);
      });
  }, []);

  const addfcolor = () => {
    console.log(frontcolor);
    axios
      .post('http://localhost:3000/custom/frontcolor', {
        sid: lastInsertID,
        front_color: frontcolor,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    gsap.from(bgRef.current, { opacity: 0, x: 100, duration: 2 });
    gsap.from(bgpicRef.current, { opacity: 0, x: -100, duration: 2 });
    gsap.from(priceRef.current, { opacity: 0, x: -100, duration: 2 });
    gsap.from(cardRef.current, { opacity: 0, y: 100, duration: 3 });
  }, []);

  return (
    <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
      <div className="cus_matte w-100 h-100 ovweflow-hidden">
        <img
          src="/imgs/Customized/cus_bg_05.jpg"
          className="cus-bg"
          alt=""
          ref={bgRef}
        />
      </div>

      <div className="work-area col-12 col-md-10 p-0 overflow-hidden">
        <div className="cus_container">
          <div className="cus-product-container">
            <div className="frot-container" ref={bgpicRef}>
              <div
                className="front-matte"
                style={{ backgroundColor: frontcolor }}
              ></div>
              <img src="/imgs/Customized/front_color_bg.png" />
            </div>
          </div>

          <div className="cus_card_container ">
            <div className="step-control">
              <div className="price-container m-0 px-3">
                <h4 ref={priceRef}>
                  NT
                  <span className="price">
                    {price === 0 ? originalPrice : price}
                  </span>
                </h4>
              </div>
              <div className="links">
                <Link to={'/customized/create/carrier'}>
                  <button className="skbtn-prev"></button>
                </Link>
                <Link to={'/customized/create/back'} onClick={addfcolor}>
                  <button className="skbtn-next"></button>
                </Link>
              </div>
            </div>

            <div className="cus_card flex-column">
              <div className="cus_product_card" ref={cardRef}>
                <p>{frontcolor}</p>

                <h3 className="text-black">Choose Front Deck's Color</h3>
                <input
                  type="color"
                  className="front-deck-input"
                  onChange={(e) => {
                    const newColor = e.target.value;
                    setFrontcolor(newColor);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cus_product_card_fcolor;
