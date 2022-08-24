import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import DataTabs from './cus_component/Cus_tab_data';

import { red } from '@mui/material/colors';
import Cus_message from './cus_component/Cus_message';
import axios from 'axios';
import { Route, useParams } from 'react-router-dom';
import './Cus_product_detail.scss';
import { height } from '@mui/system';
import AuthContext from '../../components/AuthContext';
import Avatar from '@mui/material/Avatar';
import { alert } from '../Carts/Nathan_components/AlertComponent';
import { AddToCartalert } from './cus_component/AddToCartComponent';
import { gsap } from 'gsap';

function Cus_product_detail(props) {
  // {shareCardId}=props
  let params = useParams();
  const { singleShareData, setCartTotalDep } = props;
  //把那個妙米字轉成變數
  let cid = params['*'];
  console.log(params['*']);
  const [shareDetailData, setShareDetailData] = useState([]);
  // console.log('shareDetailData',shareDetailData);

  const { auth, token } = useContext(AuthContext);
  const [stars, setStars] = useState('');
  const [comment, setComment] = useState('');
  const [mes_cusproduct_id, setMes_cusproduct_id] = useState('');

  const [messageboard, setMessageboard] = useState([]);
  const [messageDep, setMessageDep] = useState(0);

  const titleRef = useRef();
  const productRef = useRef();
  const emptyRef = useRef();
  const list1Ref = useRef();
  const list2Ref = useRef();
  const list3Ref = useRef();
  const list4Ref = useRef();
  const list5Ref = useRef();
  //商品加入購物車//
  const addToCart = () => {
    axios
      .get('http://localhost:3000/member/memberself', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.sid + '' === shareDetailData.member_id) {
          axios
            .post('http://localhost:3000/carts', {
              type: 'custom',
              quantity: '1',
              sid: cid,
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
        } else {
          alert('您只能訂購自己擁有的商品呦！');
        }
      });
  };

  //撈商品//
  useEffect(() => {
    // console.log(shareCardId);
    axios
      .get(`http://localhost:3000/custom/sharedetail?sid=${cid}`)
      .then((res) => {
        // console.log(res.data)
        setShareDetailData(res.data[0]);
        setMes_cusproduct_id(cid);
      });
  }, []);

  //加留言//
  const addComment = () => {
    axios
      .get('http://localhost:3000/member/memberself', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios.post('http://localhost:3000/custom/comment', {
          mes_cusproduct_id: mes_cusproduct_id,
          mes_member_id: res.data.sid,
          stars: stars,
          comment: comment,
        });
        setMessageDep((prev) => prev + 1);
      });
  };

  //撈留言//
  useEffect(() => {
    console.log(mes_cusproduct_id);

    axios
      .get(`http://localhost:3000/custom/messageboard?mes_cusproduct_id=${cid}`)
      .then((res) => {
        console.log(res.data);
        setMessageboard(res.data);
      });
  }, [messageDep]);

  useEffect(() => {
    gsap.from(titleRef.current, { opacity: 0, x: -50, duration: 1 });
    gsap.from(productRef.current, { opacity: 0, x: -50,delay:.3, duration: 2 });
    gsap.from(list1Ref.current, { opacity: 0, x: -20,delay:.6, duration: 2 });
    gsap.from(list2Ref.current, { opacity: 0, x: -30,delay:.9, duration: 2 });
    gsap.from(list3Ref.current, { opacity: 0, x: -40,delay:1.2, duration: 2 });
    gsap.from(list4Ref.current, { opacity: 0, x: -50,delay:1.5,  duration: 2 });
    gsap.from(list5Ref.current, { opacity: 0, x: -60,delay:1.7, duration: 2 });
    gsap.from(emptyRef.current, { opacity: 0, y: 20,delay:1.5, duration: 2 });
  }, []);

  return (
    <>
      <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area col-12 col-md-10 p-0 overflow-hidden" >
          <div className="d-flex flex-column flex-sm-row px-5">
            <div className="left col-12 col-sm-6 ">
              <p>Created By {shareDetailData.mem_name} </p>
              <h2 ref={titleRef}>{shareDetailData.custom_product_name}</h2>
              <div className="cusdetail-pic col-12 col-sm-6">
                <img
                  src={`http://localhost:3000/custom/${shareDetailData.back_img}`}
                  className="img-fluid"
                  ref={productRef}
                />
              </div>
              <div className=" cus_data_tab" ref={list1Ref}>
                <DataTabs shareDetailData={shareDetailData} messageboard={messageboard} />
              </div>
            </div>
            <div className="right col-12 col-sm-6 d-flex flex-column ">
              <div className="message mb-2">
                <h2 className="mb-3" ref={list2Ref}>
                  Message Board
                </h2>
                <div className="message-area">
                  {messageboard.length == 0 ? (
                    <div ref={emptyRef}>
                      <svg
                        width="240"
                        height="240"
                        viewBox="0 0 720 720"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M513.5 131C520.956 131 527 124.956 527 117.5C527 110.044 520.956 104 513.5 104C506.044 104 500 110.044 500 117.5C500 124.956 506.044 131 513.5 131ZM145 265C145 326.312 181.064 379.201 233.136 403.61C255.86 484.607 330.244 544 418.5 544C524.815 544 611 457.815 611 351.5C611 245.185 524.815 159 418.5 159C415.171 159 411.861 159.085 408.573 159.252C380.718 130.134 341.477 112 298 112C213.5 112 145 180.5 145 265ZM151 354.5C151 361.956 144.956 368 137.5 368C130.044 368 124 361.956 124 354.5C124 347.044 130.044 341 137.5 341C144.956 341 151 347.044 151 354.5ZM128.5 236C132.09 236 135 233.09 135 229.5C135 225.91 132.09 223 128.5 223C124.91 223 122 225.91 122 229.5C122 233.09 124.91 236 128.5 236Z"
                          fill="url(#paint0_radial_132_4)"
                        />
                        <path
                          d="M145 538L295 491.234V341L145 387.766V538Z"
                          fill="#5FC7C0"
                        />
                        <path
                          d="M445 538L295 491.234V341L445 387.766V538Z"
                          fill="#5BEAE1"
                        />
                        <path
                          d="M145 388L295 434.766V605L145 558.234V388Z"
                          fill="#D9D9D9"
                        />
                        <path
                          d="M145 388L295 434.766L258 485.5L108 438.734L145 388Z"
                          fill="#EAEAEA"
                        />
                        <path
                          d="M446 388L295 434.766V605L446 558.234V388Z"
                          fill="#F1F1F1"
                        />
                        <path
                          d="M445 388L295 434.766L332 485.5L482 438.734L445 388Z"
                          fill="#FBFBFB"
                        />
                        <path
                          d="M174.5 152L182.468 173.532L204 181.5L182.468 189.468L174.5 211L166.532 189.468L145 181.5L166.532 173.532L174.5 152Z"
                          fill="#5BEAE1"
                        />
                        <path
                          d="M497.5 311L505.468 332.532L527 340.5L505.468 348.468L497.5 370L489.532 348.468L468 340.5L489.532 332.532L497.5 311Z"
                          fill="#5BEAE1"
                        />
                        <path
                          d="M504.5 556L512.468 577.532L534 585.5L512.468 593.468L504.5 615L496.532 593.468L475 585.5L496.532 577.532L504.5 556Z"
                          fill="#3F464C"
                        />
                        <path
                          d="M366.5 45L374.468 66.5323L396 74.5L374.468 82.4677L366.5 104L358.532 82.4677L337 74.5L358.532 66.5323L366.5 45Z"
                          fill="#3F464C"
                        />
                        <path
                          d="M508 262L510.701 269.299L518 272L510.701 274.701L508 282L505.299 274.701L498 272L505.299 269.299L508 262Z"
                          fill="#5BEAE1"
                        />
                        <path
                          d="M295 205L298.781 215.219L309 219L298.781 222.781L295 233L291.219 222.781L281 219L291.219 215.219L295 205Z"
                          fill="#5BEAE1"
                        />
                        <path
                          d="M218 292L221.511 301.489L231 305L221.511 308.511L218 318L214.489 308.511L205 305L214.489 301.489L218 292Z"
                          fill="#5BEAE1"
                        />
                        <path
                          d="M312.325 422C289.527 406.477 246.189 367.42 255.219 335.373C266.508 295.314 372.75 305.329 414.584 287.302C456.417 269.276 454.073 208.687 414.584 208.687C378 208.687 299.781 184.91 286.5 145.5C280.014 126.252 279.345 94.186 275.804 81"
                          stroke="#5BEAE1"
                          strokeWidth="7"
                          strokeDasharray="14 14"
                        />
                        <defs>
                          <radialGradient
                            id="paint0_radial_132_4"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(310.5 544) rotate(-74.1508) scale(367.989 408.97)"
                          >
                            <stop stopColor="#5BEAE1" />
                            <stop offset="1" stopColor="#3F454B" />
                          </radialGradient>
                        </defs>
                      </svg>
                      <p>Leave Your Messege Here!</p>
                    </div>
                  ) : (
                    messageboard.map((v, i) => {
                      return (
                        <div
                          className="d-flex m-2 border-bottom border-gray"
                          ref={list3Ref}
                          key={v.sid}
                        >
                          <div className="col-2">
                            <Avatar sx={{ bgcolor: 'black'[900] }}>
                              <img
                                src={v.mem_avatar}
                                className="img-fluid"
                              />
                            </Avatar>
                          </div>
                          <div className="col-10">
                            <h6>
                              {v.mem_name}
                              <span className="text-warning">{v.stars}</span>
                            </h6>
                            <p>{v.comment}</p>
                            {/* <p>{v.created_time}</p> */}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <select
                  className="mb-1"
                  onChange={(e) => {
                    setStars(e.target.value);
                  }}
                  ref={list4Ref}
                >
                  <option value="✶✶✶✶✶" name="rate">
                   EXCELLENT
                  </option>
                  <option value="✶✶✶✶" name="rate">
                    LOVE IT
                  </option>
                  <option value="✶✶✶" name="rate">
                    COOL
                  </option>
                  <option value="✶✶" name="rate">
                    NOT BAD
                  </option>
                  <option value="✶" name="rate">
                    IM NOT SURE
                  </option>
                </select>

                <div className="mes-input" ref={list5Ref}>
                  <input
                    type="textarea"
                    name="comment"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={addComment}
                  >
                    send
                  </button>
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

export default Cus_product_detail;
