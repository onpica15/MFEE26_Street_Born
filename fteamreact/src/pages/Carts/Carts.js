import React, {
  useState,
  Fragment,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './Nathan_components/ProductCard';
import Scroll from 'react-scroll';
import './Carts.scss';
import OffcanvasPage from './Nathan_components/OffcanvasPage';
import CartMuiTabs from './Nathan_components/CartMuiTabs';
import axios from 'axios';
import CustomCard from './Nathan_components/CustomCard';
import LessonCard from './Nathan_components/LessonCard';
import AuthContext from '../../components/AuthContext';
import { alert } from './Nathan_components/AlertComponent';
import { gsap } from 'gsap';
const Carts = (props) => {
  const {
    productTotalQty,
    lessonTotalQty,
    customTotalQty,
    setProductTotalQty,
    setLessonTotalQty,
    setCustomTotalQty,
    cartTotalDep,
  } = props;
  // set nevigate hook
  const navigate = useNavigate();
  // 取得判斷會員的state
  const { auth, token } = useContext(AuthContext);
  const [loginMemberID, setLoginMemberID] = useState(0);

  // re-render 各種商品的依賴項
  const [productDep, setProductDep] = useState(0);
  const [customDep, setCustomDep] = useState(0);
  const [lessonDep, setLessonDep] = useState(0);

  // 3台購物車的data
  const [productCartItems, setProductCartItems] = useState([]);
  const [customCartItems, setCustomCartItems] = useState([]);
  const [lessonCartItems, setLessonCartItems] = useState([]);

  // 3台購物車的價錢
  const [productTotalPrice, setProductTotalPrice] = useState(0);
  const [lessonTotalPrice, setLessonTotalPrice] = useState(0);
  const [customTotalPrice, setCustomTotalPrice] = useState(0);
  // 獲取購物車內product的資料
  useEffect(() => {
    // 未登入會員 導向login
    if (!auth) {
      alert('請先登入會員');
      navigate('/login');
      return;
    }
    axios
      .get('http://localhost:3000/member/memberself', {
        // 發JWT一定要加這個headers
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // 確認拿到會員資料再拿購物車商品
        setLoginMemberID(res.data.sid);
        axios
          .get(`http://localhost:3000/carts?type=product&memID=${res.data.sid}`)
          .then((response) => {
            // console.log(response.data.result);
            setProductCartItems(response.data.result);
            // get product total price
            setProductTotalPrice(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                  return init + obj.item_price;
                }, 0)
                : 0
            );
            // get product qty
            setProductTotalQty(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                  return init + obj.quantity;
                }, 0)
                : 0
            );
          });
      });
  }, [productDep, cartTotalDep]);
  // 獲取購物車內custom的資料
  useEffect(() => {
    axios
      .get('http://localhost:3000/member/memberself', {
        // 發JWT一定要加這個headers
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // 確認拿到會員資料再拿購物車商品
        axios
          .get(`http://localhost:3000/carts?type=custom&memID=${res.data.sid}`)
          .then((response) => {
            // console.log(response.data.result);
            setCustomCartItems(response.data.result);
            // get custom total price
            setCustomTotalPrice(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                  return init + obj.item_price;
                }, 0)
                : 0
            );
            // get custom qty
            setCustomTotalQty(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                  return init + obj.quantity;
                }, 0)
                : 0
            );
          });
      });
  }, [customDep]);
  // 獲取購物車內lesson的資料
  useEffect(() => {
    axios
      .get('http://localhost:3000/member/memberself', {
        // 發JWT一定要加這個headers
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // 確認拿到會員資料再拿購物車商品
        axios
          .get(`http://localhost:3000/carts?type=lesson&memID=${res.data.sid}`)
          .then((response) => {
            // console.log(response.data.result);
            setLessonCartItems(response.data.result);
            // get lesson total price
            setLessonTotalPrice(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                  return init + obj.item_price;
                }, 0)
                : 0
            );
            // get lesson qty
            setLessonTotalQty(
              response.data.result.length !== 0
                ? response.data.result.reduce((init, obj) => {
                  return init + obj.quantity;
                }, 0)
                : 0
            );
          });
      });
  }, [lessonDep]);
  // Tabs所有選項
  const cartItemArr = ['PRODUCTS', 'CUSTOMIZED', 'LESSONS'];
  const [selectItem, setSelectItem] = useState('PRODUCTS');
  const checkoutRef = useRef(null);
  const bgRef = useRef(null);
  const mdTabRef = useRef(null);
  const cartItemRef = useRef(null);
  // gsap setting
  useEffect(() => {
    // gsap.from(cartItemRef.current, {
    //   display: 'none',
    //   opacity: 0,
    //   duration: 0.5,
    //   delay: 1,
    //   ease: 'expo',
    // });
    gsap.from(checkoutRef.current, {
      opacity: 0.6,
      x: 200,
      duration: 2,
      ease: 'expo',
    });
    gsap.from(bgRef.current, { opacity: 0, duration: 2, ease: 'expo' });
    gsap.from(mdTabRef.current, {
      opacity: 0.6,
      y: -100,
      duration: 2,
      ease: 'expo',
    });
  }, []);
  return (
    <>
      <div
        className="carts-bg w-100 vh-100 d-flex justify-content-end align-items-end"
        ref={bgRef}
      >
        <div className="work-area col-12 col-md-10 p-0 d-flex">
          <div className="col-12 col-md-10 h-100">
            <div className="tabs-section w-100">
              <div className="w-100 h-100 d-none d-md-block" ref={mdTabRef}>
                <CartMuiTabs
                  selectItem={selectItem}
                  setSelectItem={setSelectItem}
                  productTotalQty={productTotalQty}
                  customTotalQty={customTotalQty}
                  lessonTotalQty={lessonTotalQty}
                />
              </div>
              <div className="carts-tabs-wrap w-100 h-100 p-4 d-md-none">
                <select
                  onChange={(e) => {
                    setSelectItem(e.target.value);
                  }}
                  value={selectItem}
                  className="carts-selection w-100 h-100"
                >
                  {cartItemArr.map((v, i) => {
                    return (
                      <Fragment key={i}>
                        <option value={v}>
                          {v}---(
                          {v === 'PRODUCTS'
                            ? productTotalQty
                            : v === 'CUSTOMIZED'
                              ? customTotalQty
                              : lessonTotalQty}
                          )
                        </option>
                      </Fragment>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="carts-card-section w-100">
              <div className="carts-card-wrap w-100 h-100 px-4 px-md-0">
                <div className="card-scroll-list-wrap">
                  <div
                    ref={cartItemRef}
                    style={{
                      left:
                        selectItem === 'PRODUCTS'
                          ? '-0%'
                          : selectItem === 'CUSTOMIZED'
                            ? '-100%'
                            : '-200%',
                    }}
                    className="card-scroll-list"
                  >
                    <Scroll.Element className="products-card-scroll">
                      {productCartItems.length === 0 ? (
                        <div
                          style={{
                            filter: 'grayscale(100%)',
                            backgroundColor: 'rgb(245,245,245)',
                            border: '1px solid black',
                          }}
                          className="w-91 h-100 d-flex flex-column justify-content-center align-items-center"
                        >
                          <svg
                            className=" w-40 h-40"
                            width="720"
                            height="720"
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
                          <span className="fw-bold opacity-50">EMPTY</span>
                        </div>
                      ) : (
                        productCartItems.map((v, i) => {
                          return (
                            <ProductCard
                              key={v.sid}
                              singleItem={v}
                              singleInd={i}
                              productCartItems={productCartItems}
                              setProductCartItems={setProductCartItems}
                              productDep={productDep}
                              setProductDep={setProductDep}
                            />
                          );
                        })
                      )}
                    </Scroll.Element>
                    <Scroll.Element className="customized-card-scroll">
                      {customCartItems.length === 0 ? (
                        <div
                          style={{
                            filter: 'grayscale(100%)',
                            backgroundColor: 'rgb(245,245,245)',
                            border: '1px solid black',
                          }}
                          className="w-91 h-100 d-flex flex-column justify-content-center align-items-center"
                        >
                          <svg
                            className=" w-40 h-40"
                            width="720"
                            height="720"
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
                          <span className="fw-bold opacity-50">EMPTY</span>
                        </div>
                      ) : (
                        customCartItems.map((v, i) => {
                          return (
                            <CustomCard
                              key={v.sid}
                              singleItem={v}
                              singleInd={i}
                              customCartItems={customCartItems}
                              setCustomCartItems={setCustomCartItems}
                              customDep={customDep}
                              setCustomDep={setCustomDep}
                            />
                          );
                        })
                      )}
                    </Scroll.Element>
                    <Scroll.Element className="lesson-card-scroll">
                      {lessonCartItems.length === 0 ? (
                        <div
                          style={{
                            filter: 'grayscale(100%)',
                            backgroundColor: 'rgb(245,245,245)',
                            border: '1px solid black',
                          }}
                          className="w-91 h-100 d-flex flex-column justify-content-center align-items-center"
                        >
                          <svg
                            className=" w-40 h-40"
                            width="720"
                            height="720"
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
                          <span className="fw-bold opacity-50">EMPTY</span>
                        </div>
                      ) : (
                        lessonCartItems.map((v, i) => {
                          return (
                            <LessonCard
                              key={v.sid}
                              singleItem={v}
                              customCartItems={customCartItems}
                              setLessonCartItems={setLessonCartItems}
                              lessonDep={lessonDep}
                              setLessonDep={setLessonDep}
                            />
                          );
                        })
                      )}
                    </Scroll.Element>
                  </div>
                </div>
              </div>
            </div>
            <div ref={checkoutRef} className="total-count-section w-100">
              <div className="total-count-wrap h-100 m-0">
                <div className="total-top-grid w-100 d-flex">
                  <div className="cart-total-title col-4 h-100 d-flex justify-content-center align-items-center">
                    <span>TOTAL</span>
                  </div>
                  <div className="cart-total-title col-4 h-100 d-flex justify-content-center align-items-center">
                    <span>ITEMS</span>
                  </div>
                  <div className="cart-total-title col-4 h-100 d-flex justify-content-center align-items-center"></div>
                </div>
                <div className="total-bottom-grid w-100 d-flex">
                  <div className="cart-total-text col-4 h-100 d-flex justify-content-center align-items-center">
                    {/* total price */}
                    <span>
                      ${productTotalPrice + lessonTotalPrice + customTotalPrice}
                    </span>
                  </div>
                  <div className="cart-total-text col-4 h-100 d-flex justify-content-center align-items-center">
                    {/* total counts */}
                    <span>
                      {productTotalQty + lessonTotalQty + customTotalQty}
                    </span>
                  </div>
                  <div className="col-4 h-100 d-flex justify-content-start align-items-center btn-check-wrap">
                    <OffcanvasPage
                      loginMemberID={loginMemberID}
                      setProductDep={setProductDep}
                      setCustomDep={setCustomDep}
                      setLessonDep={setLessonDep}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-none col-md-2  h-100"></div>
        </div>
      </div>
    </>
  );
};

export default Carts;
