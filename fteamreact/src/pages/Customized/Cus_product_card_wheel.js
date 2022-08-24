import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cus_product_card_wheel.scss';
import { gsap } from 'gsap';
import { alert } from '../Carts/Nathan_components/AlertComponent';
import { positions } from '@mui/system';

const whselect = [
  {
    id: 1,
    wheel: 'NeonGreen',
    img: 'display_NeonGreen.png',
  },
  {
    id: 2,
    wheel: 'PinkWave',
    img: 'display_PinkWave.png',
  },
  {
    id: 3,
    wheel: 'PurpleStart',
    img: 'display_w03.png',
  },
  {
    id: 4,
    wheel: 'BlackBlue',
    img: 'display_PurpleStart.png',
  },
];

function Cus_product_card_wheel(props) {
  const { lastInsertID, setLastInsertID } = props;
  const [lastInsertIDDep, setLastInsertIDDep] = useState(0);
  const [wheel, setWheel] = useState('NeonGreen');
  const navigate = useNavigate();

  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);

  const bgRef = useRef();
  const bgpicRef = useRef();
  const priceRef = useRef();
  const cardRef = useRef();

  const wheelRef = useRef();
  const [wheeldep, setWheelDep] = useState(0);
  //取得價錢//
  useEffect(() => {
    console.log(lastInsertID);
    if (lastInsertID !== 0) {
      axios
        .get(`http://localhost:3000/custom/price?sid=${lastInsertID}`)
        .then((res) => {
          console.log('111', res.data[0].price);
          setOriginalPrice(+res.data[0].price);
          setPrice(+res.data[0].price);
        });
    }
  }, []);

  useEffect(() => {
    gsap.from(bgRef.current, { opacity: 0, x: 100, duration: 1 });
    gsap.from(bgpicRef.current, { opacity: 0, x: -100, duration: 2 });
    gsap.from(priceRef.current, { opacity: 0, x: -100, duration: 2 });
    gsap.from(cardRef.current, { opacity: 0, y: 100, duration: 3 });
    gsap.from(wheelRef.current, { rotation: 360, duration: 2 });
  }, []);

  const selectWheel = (e) => {
    const newWheel = e.target.value;
    setWheel(newWheel);
    console.log(newWheel);
    if (newWheel === 'NeonGreen') {
      setPrice(originalPrice + 400);
    }
    if (newWheel === 'PinkWave') {
      setPrice(originalPrice + 800);
    }
    if (newWheel === 'PurpleStart') {
      setPrice(originalPrice + 1200);
    }
    if (newWheel === 'BlackBlue') {
      setPrice(originalPrice + 1600);
    }
    setWheelDep(1);
    gsap.to(wheelRef.current, { rotation: '+=180', duration: 0.5 });
  };

  const addwheel = () => {
    console.log(price);
    if (price == originalPrice) {
      alert('請選擇');
    } else {
      axios
        .post('http://localhost:3000/custom/wheel', {
          sid: lastInsertID,
          wheel_style: wheel,
          price: price,
        })
        .then(() => {
          navigate('/customized/create/carrier');
        });
    }
  };
  return (
    <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
      <div className="cus_matte w-100 h-100 ovweflow-hidden  ">
        <div
          className="bg-train"
          ref={bgRef}
          style={{
            top:
              wheel === 'NeonGreen'
                ? '0px'
                : wheel === 'PinkWave'
                ? '-1400px'
                : wheel === 'PurpleStart'
                ? '-2800px'
                : '-4200px',
          }}
        >
          <img src="/imgs/Customized/cus_bg_06.jpg" className="cus-bg" />
          <img src="/imgs/Customized/cus_bg_08.jpg" className="cus-bg" />
          <img src="/imgs/Customized/cus_bg_09.jpg" className="cus-bg" />
          <img src="/imgs/Customized/cus_bg_10.jpg" className="cus-bg" />
        </div>

        <img src="/imgs/Customized/cus_bg_05.jpg" className="cus-bg" />
      </div>

      <div className="work-area col-12 col-md-10 p-0 overflow-hidden">
        {/* {lastInsertID} */}
        <div className="cus_container">
          <div className="cus-product-container">
            <div className="wheel-img" ref={bgpicRef}>
              <img
                src={`/imgs/Customized/display_${wheel}.png`}
                className="wheel-bg wheel"
                alt=""
                ref={wheelRef}
              />

              <img
                src="/imgs/Customized/Wheel.png"
                className="wheel-bg"
                alt=""
              />
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
                <Link to={'/customized/create'}>
                  <button className="skbtn-prev"></button>
                </Link>
                <div>
                  <button className="skbtn-next" onClick={addwheel}></button>
                </div>
              </div>
            </div>

            <div className="cus_card flex-column" ref={cardRef}>
              <div className="cus_product_card">
                <p>{wheel}</p>
                <h3 className="text-black">Choose Your Wheel</h3>
                <div className="wheel-selectors">
                  <div className="wheel-select">
                    <input
                      type="radio"
                      value="NeonGreen"
                      name="cus_wheel"
                      onChange={selectWheel}
                    />
                    <img src="/imgs/Customized/select_w01.png" />
                  </div>
                  <div className="wheel-select">
                    <input
                      type="radio"
                      value="PinkWave"
                      name="cus_wheel"
                      onChange={selectWheel}
                    />
                    <img src="/imgs/Customized/select_w02.png" />
                  </div>
                  <div className="wheel-select">
                    <input
                      type="radio"
                      value="PurpleStart"
                      name="cus_wheel"
                      onChange={selectWheel}
                    />
                    <img src="/imgs/Customized/select_w03.png" />
                  </div>
                  <div className="wheel-select">
                    <input
                      type="radio"
                      value="BlackBlue"
                      name="cus_wheel"
                      onChange={selectWheel}
                    />
                    <img src="/imgs/Customized/select_w04.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cus_product_card_wheel;
