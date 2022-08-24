import React, { useState, useEffect, useContext } from 'react';
import Logo from '../logo_imgs/fteam-logo2.png';
import MenuSelect from './MenuSelect';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MemberContext } from '../App';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';
import ScrollBox from './ScrollBox/ScrollBox';
import { confirm } from './ConfirmComponent';
import { alert } from './AlertComponent';
import CustomChat from '../pages/Carts/Nathan_components/CustomChat';
const Navbar = (props) => {
  const {
    productTotalQty,
    lessonTotalQty,
    customTotalQty,
    setProductTotalQty,
    setLessonTotalQty,
    setCustomTotalQty,
    favoritesNum,
    setFavoritesNum,
    cartTotalDep,
    setCartTotalDep,
    setProductBg,
  } = props;
  const navigate = useNavigate();
  // 從這支Context拿值
  // auth為登入判斷(true,false) token為會員JWT的token logout是登出涵式
  const { auth, token, logout, auths, grade } = useContext(AuthContext);
  // 會員個人資料的State
  const { member, setMember } = useContext(MemberContext);
  // 接NavBar要顯示的姓名或暱稱
  const [navName, setNavName] = useState('');

  // 收藏清單開關
  const [IamKevin, setIamKevin] = useState(false);

  // 收藏列表清單加入購物車
  const [kevinCartsMemId, setKevinCartsMemId] = useState(0);

  // Icon收藏列表清單
  const [iconFavorites, setIconFavorites] = useState([]);
  // custom chat
  const [msgArr, setMsgArr] = useState([]);
  const [msgDataStore, setMsgDataStore] = useState([]);
  // 判斷有沒有登入存的值
  useEffect(() => {
    // 登入狀態不是false再執行 否則直接return
    // console.log(token);
    if (!auth) {
      setProductTotalQty(0);
      setLessonTotalQty(0);
      setCustomTotalQty(0);
      setFavoritesNum(0);
      return;
    } else {
      if (grade !== 'low') {
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
          // 接會員所有資料
          setMember(res.data);
          // 先接會員暱稱 NavBar顯示專用
          setNavName(res.data.mem_nickname);
          // 收藏列表清單加入購物車
          setKevinCartsMemId(res.data.sid);
          // 如果會員沒有暱稱改接姓名
          if (res.data.mem_nickname === '') {
            setNavName(res.data.mem_name);
          }
          // 讀取購物車總數
          axios
            .get(`http://localhost:3000/carts/getTotal?memID=${res.data.sid}`)
            .then((res) => {
              if (res.data.productResult.length !== 0) {
                let productTotal = 0;
                for (let i of res.data.productResult) {
                  productTotal += i.quantity;
                }
                setProductTotalQty(productTotal);
              }
              if (res.data.customResult.length !== 0) {
                let customTotal = 0;
                for (let i of res.data.customResult) {
                  customTotal += i.quantity;
                }
                setCustomTotalQty(customTotal);
              }
              if (res.data.lessonResult.length !== 0) {
                let lessonTotal = 0;
                for (let i of res.data.lessonResult) {
                  lessonTotal += i.quantity;
                }
                setLessonTotalQty(lessonTotal);
              }
            });
          // 紀錄該會員商品收藏總數
          axios
            .get(`http://localhost:3000/product/favoriteCount`, {
              // 發JWT一定要加這個headers
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              let favoritesNum = res.data[`count(sid)`];
              setFavoritesNum(favoritesNum);
            });
          // 顯示收藏icon清單商品資料
          axios
            .get(`http://localhost:3000/product/iconFavorites`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setIconFavorites(res.data);
            });
        });
    }
  }, [
    auths,
    auth,
    token,
    // setMember,
    setFavoritesNum,
    cartTotalDep,
    favoritesNum,
  ]); // 有變更資料才刷新
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <>
      <div className="w-100 top-grid d-flex">
        <div className="col-4 h-100 d-flex align-items-center">
          <div
            className="logo-wrap"
            onClick={() => {
              navigate('/');
            }}
          >
            <img src={Logo} alt="" />
          </div>
        </div>
        <div className="col-4 h-100"></div>
        <div className="col-4 h-100 ">
          <MenuSelect />
          <div className="nav-icon-wrap w-100 h-100 d-md-flex d-none justify-content-end align-items-center">
            {auth ? (
              // 登入
              grade === 'low' ? (
                <Link
                  className="text-decoration-none d-flex"
                  to={grade === 'low' ? '/member' : '/admin'}
                >
                  <div className="userLogin-icon-box">
                    <img
                      className="col-2 userLogin-icon-wrap"
                      style={{
                        objectFit: 'cover',
                        borderRadius: '50%',
                        aspectRatio: '1/1',
                      }}
                      src={member.mem_avatar}
                      alt=""
                    />
                    <span className="user-icon-text col-6">{navName}</span>
                  </div>
                </Link>
              ) : (
                <div className="user-icon-wrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )
            ) : (
              // 未登入狀態顯示會員icon
              <Link to={'/login'}>
                <div className="user-icon-wrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </Link>
            )}
            <div
              className="like-icon-wrap"
              onClick={() => {
                setIamKevin(!IamKevin);
              }}
            >
              <div
                className="like-icon-count"
                style={{ display: favoritesNum === 0 ? 'none' : '' }}
              >
                <span style={{ width: favoritesNum >= 10 ? '65%' : '50%' }}>
                  {favoritesNum}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>

              <div
                className="favoritesList"
                style={{ display: IamKevin === false ? 'none' : 'block' }}
                onMouseLeave={() => {
                  setIamKevin(!IamKevin);
                }}
              >
                <ScrollBox>
                  {iconFavorites.length === 0 ? (
                    <div className="h-100 w-100">
                      <svg
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
                    </div>
                  ) : (
                    iconFavorites.map((r) => {
                      return (
                        <div className="favoritesBigBox" key={r.sid}>
                          <div className="favoritesBox d-flex">
                            <div className="col-4 favoritesBoxImg">
                              <img
                                src={`/imgs/Products/${r.favoriteImg}`}
                                alt=""
                              />
                            </div>

                            <div className="col-8 favoritesBody">
                              <h5 className="favoritesBodyName">
                                {r.favoriteName}
                              </h5>
                              <p className="favoritesBodyBrand">
                                {r.favoriteBrand}
                              </p>
                              <p className="favoritesBodyPrice">
                                <span>$ {r.favoritePrice}</span>
                              </p>
                            </div>
                          </div>

                          <div className="favoritesInt">
                            <button
                              onClick={() => {
                                const favoritesToCarts = {
                                  sid: r.sid,
                                  type: 'product',
                                  quantity: 1,
                                  memID: kevinCartsMemId,
                                };
                                axios
                                  .post(
                                    'http://localhost:3000/carts',
                                    favoritesToCarts
                                  )
                                  .then((res) => {
                                    if (res.data.success === true) {
                                      alert('商品加入購物車成功');
                                    } else {
                                      alert('商品已經存在購物車');
                                    }

                                    console.log('res.data===', res.data);
                                    setCartTotalDep((prev) => prev + 1);
                                  });
                              }}
                            >
                              Add to Carts
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </ScrollBox>
              </div>
            </div>

            <div
              onClick={() => {
                if (!auth) {
                  let i = confirm('您尚未登入,是否前往登入會員?');
                  i.then((res) => {
                    if (res === true) {
                      navigate('/login');
                    } else {
                      return;
                    }
                  });
                } else {
                  navigate('/carts');
                }
              }}
            >
              <div className="cart-icon-wrap">
                <div
                  style={{
                    display:
                      productTotalQty + lessonTotalQty + customTotalQty === 0
                        ? 'none'
                        : 'flex',
                  }}
                  className="cart-icon-count"
                >
                  <span
                    style={{
                      width:
                        productTotalQty + lessonTotalQty + customTotalQty > 10
                          ? '70%'
                          : '40%',
                    }}
                  >
                    {productTotalQty + lessonTotalQty + customTotalQty}
                  </span>
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            {auth ? (
              // 登入狀態顯示SIGNOUT
              <div
                className="text-decoration-none text-black auth-text-wrap"
                onClick={() => {
                  // 呼叫登出函式
                  logout();
                }}
              >
                SIGNOUT
              </div>
            ) : (
              // 未登入狀態顯示LOGIN
              <Link className=" text-decoration-none text-black" to={'/login'}>
                <div className="auth-text-wrap">LOGIN</div>
              </Link>
            )}
          </div>
        </div>
        <CustomChat
          msgArr={msgArr}
          setMsgArr={setMsgArr}
          msgDataStore={msgDataStore}
          setMsgDataStore={setMsgDataStore}
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
        />
      </div>
    </>
  );
};

export default Navbar;
