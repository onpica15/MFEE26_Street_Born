import React, { useState, useEffect } from 'react';
import ScrollBox from '../../../components/ScrollBox/ScrollBox';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import '../styles/WatchFavorite.scss';

const WatchFavorite = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [favoritesData, setFavoritesData] = useState([]);
  const [memId, setMemId] = useState('');

  const memberFavoriteDetails = async (memberId) => {
    setMemId(memberId);
    axios
      .get(`http://localhost:3000/admin/memberfavorite/${memberId}`)
      .then((res) => {
        setFavoritesData(res.data);
      });
  };
  useEffect(() => {
    memberFavoriteDetails(params.memberId);
  }, [params.memberId]);

  console.log(favoritesData);

  return (
    <>
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-dark watchFavoriteWrap">
        <div className="h-90 w-30 bg-light watchFavoriteBox">
          <div className="h-10 w-100 d-flex justify-content-center align-items-center watchFavoriteTitle">
            <h2>{memId} Saved</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-10 cursorpointer"
              onClick={() => {
                navigate('/admin');
              }}
            >
              <path
                fill="red"
                d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM143 208.1L190.1 255.1L143 303C133.7 312.4 133.7 327.6 143 336.1C152.4 346.3 167.6 346.3 176.1 336.1L223.1 289.9L271 336.1C280.4 346.3 295.6 346.3 304.1 336.1C314.3 327.6 314.3 312.4 304.1 303L257.9 255.1L304.1 208.1C314.3 199.6 314.3 184.4 304.1 175C295.6 165.7 280.4 165.7 271 175L223.1 222.1L176.1 175C167.6 165.7 152.4 165.7 143 175C133.7 184.4 133.7 199.6 143 208.1V208.1z"
              />
            </svg>
          </div>
          <div className="h-90 w-100">
            {favoritesData.length === 0 ? (
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
            ) : (
              <ScrollBox>
                {favoritesData.map((v, i) => {
                  return (
                    <div className="w-95 m-3 adminfavoriteCard" key={uuidv4()}>
                      <div className="d-flex h-100 w-100">
                        <div className="col-xl-3">
                          <img
                            src={`/imgs/Products/${v.favoriteImg}`}
                            alt=""
                            className="h-100"
                            style={{
                              objectFit: 'cover',
                              aspectRatio: '1/1',
                            }}
                            onClick={() => {
                              navigate(`/PRODUCTS/details/${v.favoriteId}`);
                            }}
                          />
                        </div>
                        <div className="col-xl-9">
                          <p
                            className="h-50 p-3 m-0"
                            onClick={() => {
                              navigate(`/PRODUCTS/details/${v.favoriteId}`);
                            }}
                          >
                            {v.favoriteName}
                          </p>
                          <div className="h-50 d-flex justify-content-end align-items-center">
                            <h5 className="text-gray p-3">
                              $ {v.favoritePrice}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ScrollBox>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchFavorite;
