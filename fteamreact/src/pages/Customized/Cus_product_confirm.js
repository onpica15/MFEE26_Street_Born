import React, { useEffect, useState, useContext,useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../../components/AuthContext';


import { red } from '@mui/material/colors';
import {alert} from '../Carts/Nathan_components/AlertComponent'
import { AddToCartalert } from './cus_component/AddToCartComponent';
import './Cus_product_confirm.scss';
import { gsap } from "gsap";
import { Player } from "@lottiefiles/react-lottie-player";



function Cus_product_confirm(props) {
  const { lastInsertID, setLastInsertID, setCartTotalDep } = props;
  const [cusData, setCusData] = useState({});
  const { auth, token } = useContext(AuthContext);

  const titleRef = useRef();
  const productRef = useRef();
  const list1Ref = useRef();
  const list2Ref = useRef();
  const list3Ref = useRef();
  const list4Ref = useRef();
  const list5Ref = useRef();

  const addToCart = () => {
    axios
      .get('http://localhost:3000/member/memberself', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .post('http://localhost:3000/carts', {
            type: 'custom',
            quantity: '1',
            sid: lastInsertID,
            memID: res.data.sid,
          })
          .then((res) => {
            if (res.data.success) {
              AddToCartalert('加入成功');
              setCartTotalDep((prev) => prev + 1);
            } else {
              AddToCartalert('商品已存在購物車');
            }
          });
      });
  };

  useEffect(() => {
    console.log(lastInsertID);
    axios
      .get(`http://localhost:3000/custom/confirm?sid=${lastInsertID}`)
      .then((res) => {
        console.log(res.data);
        setCusData(res.data[0]);
      });
  }, []);

  useEffect(() => {
    gsap.from(titleRef.current, { opacity: 0,x:50,duration:1 });
    gsap.from(productRef.current, { opacity: 0,x:-50, deley:.2,duration:2});
    gsap.from(list1Ref.current, { opacity: 0,x:20,deley:.4,duration:2});
    gsap.from(list2Ref.current, { opacity: 0,x:30,deley:.6, duration:2});
    gsap.from(list3Ref.current, { opacity: 0,x:40,deley:.8,duration:2});
    gsap.from(list4Ref.current, { opacity: 0,x:50,deley:1, duration:2});
    gsap.from(list5Ref.current, { opacity: 0,x:60,deley:1.2, duration:2});
  },[]);

  return (
    <>
      <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area col-12 col-md-10 p-0 overflow-hidden">
          <div className="d-flex flex-wrap px-5">
            <div className="left col-12 col-sm-6 p-0 pe-sm-5 ">
              <h2 ref={titleRef}>
                CUSTOM PRODUCT <br /> DETAIE
              </h2>
              <p ref={titleRef}>Created at {cusData.created_date} </p>
              
              <div className="cusdetail-pic col-12 col-sm-6" ref={productRef}>
             
                <img
                  src={`http://localhost:3000/custom/${cusData.back_img}`}
                  className="img-fluid"
                />
              </div>

              <div>
        
      </div>

              <div className="attribuies" ref={list1Ref}>
                <p>Project Name</p>
                <div className='d-flex justify-content-between'>
                  <h3>{cusData.custom_product_name}</h3>
                  <h4 className='fw-light'>NT<span className='fw-bold'>{cusData.price}</span></h4>
                </div>
              </div>
            </div>
            <div className="right col-12 col-sm-6 d-flex flex-column ">
              <div className="cus-confirm-detail">
                <div className="attribuies" ref={list2Ref}>
                  <h4>Wheel</h4>
                  <div className="attribuie">
                    <img
                      src={`/imgs/Customized/display_${cusData.wheel_style}.png`}
                      className="cus-deteil-img"
                    />
                    <p>{cusData.wheel_style}</p>
                  </div>
                </div>

                <div className="attribuies" ref={list3Ref}>
                  <h4>Carrier</h4>
                  <div className="attribuie">
                    <img
                      src={`/imgs/Customized/carrier_${cusData.carrier}.png`}
                      className="cus-deteil-img"
                    />
                    <p>{cusData.carrier}</p>
                  </div>
                </div>

                <div className="attribuies" ref={list4Ref}>
                  <h4>Front Deck Color</h4>
                  <div className="attribuie">
                    <div
                      className="cus-deteil-color"
                      style={{ backgroundColor: `${cusData.front_color}` }}
                    ></div>
                    <p>{cusData.front_color}</p>
                  </div>
                </div>

                <div className="attribuies" ref={list5Ref}>
                  <h4>Back Picture</h4>
                  <div className="back-details">
                    <div className="back-detail">
                      <div className="attribuie">
                        <img
                          src={`/imgs/Customized/${cusData.back_style}.png`}
                          className="cus-deteil-img"
                        />
                        <p>{cusData.back_style}</p>
                      </div>
                    </div>

                    <div className="back-detail">
                      <div className="attribuie">
                        <img
                          src={`/imgs/Customized/pattern/${cusData.back_pattern}.png`}
                          style={{ backgroundColor: '#123456' }}
                          className="cus-deteil-img"
                        />
                        <p>{cusData.back_pattern}</p>
                      </div>
                    </div>

                    <div className="back-detail">
                      <div className="attribuie">
                        <div
                          className="cus-deteil-color"
                          style={{ backgroundColor: `${cusData.back_color}` }}
                        ></div>
                        <p>{cusData.back_color}</p>
                      </div>
                    </div>

                    <div className="back-detail">
                      <div className="attribuie">
                        <img
                          src={`/imgs/Customized/sticker/${cusData.back_sticker}.png`}
                          style={{ backgroundColor: '#123456' }}
                          className="cus-deteil-img"
                        />
                        <p>{cusData.back_sticker}</p>
                      </div>
                    </div>

                    <div className="back-detail">
                      <div className="attribuie">
                        <img
                          src={`/imgs/Customized/sticker/Dot.png`}
                          style={{ backgroundColor: '#123456' }}
                          className="cus-deteil-img"
                        />
                        <p>{cusData.back_text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail_btn">
                <Link to={'/customized/explore'}>
                  <button className="viv-btn">Explore</button>
                </Link>
                <button className="viv-btn" onClick={addToCart}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cus_product_confirm;
