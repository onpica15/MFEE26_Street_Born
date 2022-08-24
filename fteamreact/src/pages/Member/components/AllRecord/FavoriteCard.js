import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../../components/AuthContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/FavoriteCard.scss';
import { useNavigate } from 'react-router-dom';
import { confirm } from '../../../../components/ConfirmComponent';
import { alert } from '../../../../components/AlertComponent';

const FavoriteCard = ({ setCartTotalDep }) => {
  const navigate = useNavigate();
  const { auth, token, auths, setAuths } = useContext(AuthContext);
  const [favoriteCard, setFavoriteCard] = useState([]);
  useEffect(() => {
    if (!auth) {
      return;
    } else {
      axios
        .get('http://localhost:3000/member/favorite', {
          // 發JWT一定要加這個headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFavoriteCard(res.data);
        });
    }
  }, [auth, token, auths]);
  // 取消收藏
  function deleteFavorite(v) {
    let i = confirm('確定要取消收藏該商品?');
    i.then((res) => {
      if (res) {
        axios
          .post('http://localhost:3000/member/delfavorite', {
            sid: v.sid,
          })
          .then((res) => {
            if (res.data.success) {
              setAuths({ ...auths, change: uuidv4() });
              alert('已取消收藏');
            } else {
              alert('取消收藏失敗');
            }
          });
      } else {
        return;
      }
    });
  }
  // 加入購物車
  function goToCarts(v) {
    let i = confirm('確定要將該商品放入購物車?');
    i.then((res) => {
      if (res) {
        axios
          .post(
            'http://localhost:3000/carts',
            {
              type: 'product',
              quantity: 1,
              sid: v.favoriteId,
              memID: v.memId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            // 從收藏刪除
            if (res.data.success) {
              axios
                .post('http://localhost:3000/member/delfavorite', {
                  sid: v.sid,
                })
                .then((res) => {
                  if (res.data.success) {
                    setAuths({ ...auths, change: uuidv4() });
                    alert('商品成功加入購物車');
                    // setCartTotalDep((pre) => pre + 1);
                  }
                });
            } else {
              alert('商品加入失敗');
            }
          });
      }
    });
  }
  return (
    <>
      {favoriteCard.length === 0 ? (
        <svg
          width="100%"
          height="100%"
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
          <path d="M145 538L295 491.234V341L145 387.766V538Z" fill="#5FC7C0" />
          <path d="M445 538L295 491.234V341L445 387.766V538Z" fill="#5BEAE1" />
          <path d="M145 388L295 434.766V605L145 558.234V388Z" fill="#D9D9D9" />
          <path
            d="M145 388L295 434.766L258 485.5L108 438.734L145 388Z"
            fill="#EAEAEA"
          />
          <path d="M446 388L295 434.766V605L446 558.234V388Z" fill="#F1F1F1" />
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
      ) : (
        favoriteCard.map((v, i) => {
          return (
            <div className="w-95 m-3 favoriteCard" key={uuidv4()}>
              <div className="d-flex h-100 w-100">
                <div className="col-3 d-flex justify-content-center align-items-center">
                  <img
                    src={`/imgs/Products/${v.favoriteImg}`}
                    alt=""
                    className="h-85"
                    style={{
                      objectFit: 'cover',
                      aspectRatio: '1/1',
                    }}
                    onClick={() => {
                      navigate(`/PRODUCTS/details/${v.favoriteId}`);
                    }}
                  />
                </div>
                <div className="col-9">
                  <p
                    className="h-50 p-3 m-0"
                    onClick={() => {
                      navigate(`/PRODUCTS/details/${v.favoriteId}`);
                    }}
                  >
                    {v.favoriteName}
                  </p>
                  <div className="h-50 d-flex justify-content-between align-items-center">
                    <h5 className="p-3">$ {v.favoritePrice}</h5>
                    <div className="d-flex justify-content-center svgBox">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="deleteSvg"
                        onClick={() => {
                          deleteFavorite(v);
                        }}
                      >
                        <path
                          fill="red"
                          d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="cartSvg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black"
                        strokeWidth={2}
                        onClick={() => {
                          goToCarts(v);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default FavoriteCard;
