// import { render } from '@testing-library/react';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import '../style/Lesson_card.scss';
import { alert } from '../../Carts/Nathan_components/AlertComponent';
function Lesson_card(props) {
  const {
    lessonDisplay,
    setLessonDisplay,
    lessonRaw,
    danceList,
    timeList,
    priceSortSelect,
    // setPriceSortSelect,
    loginID,
    setCartTotalDep,
  } = props;
  // const [lessonDisplayDep, setLessonDisplayDep] = useState(0);
  // useEffect(() => {
  //   danceRefresh();
  // }, [danceList]);

  // useEffect(() => {
  //   timeRefresh();
  // }, [timeList]);

  // useEffect(() => {
  //   priceRefresh();
  // }, [priceSortSelect]);

  // const danceRefresh = () => {
  //   const newLessonDisplay = lessonRaw.filter((v, i) => {
  //     return v.type.includes(danceList);
  //   });
  //   console.log('danceRefresh', newLessonDisplay);
  //   setLessonDisplay(newLessonDisplay);
  // };

  // const timeRefresh = () => {
  //   const newLessonDisplay = lessonRaw.filter((v, i) => {
  //     return v.duringtime_begin.includes(timeList);
  //   });
  //   console.log('timeRefresh', newLessonDisplay);
  //   setLessonDisplay(newLessonDisplay);
  // };

  // const priceRefresh = () => {
  //   const oringinRaw = JSON.parse(JSON.stringify(lessonRaw));
  //   if (priceSortSelect === 'PRICE') {
  //     setLessonDisplay(oringinRaw);
  //   }
  //   if (priceSortSelect === 'Low') {
  //     const newLessonDisplay = oringinRaw.sort((a, b) => {
  //       return a.price - b.price;
  //     });
  //     // console.log('Low-priceRefresh', newLessonDisplay);
  //     setLessonDisplay(newLessonDisplay);
  //   }
  //   if (priceSortSelect === 'High') {
  //     const newLessonDisplay = oringinRaw.sort((a, b) => {
  //       return b.price - a.price;
  //     });
  //     // console.log('High-priceRefresh', newLessonDisplay);
  //     setLessonDisplay(newLessonDisplay);
  //   }
  // };
  useEffect(() => {
    fillterAllSelector();
  }, [timeList, danceList, priceSortSelect]);
  const fillterAllSelector = () => {
    const oringinRaw = JSON.parse(JSON.stringify(lessonRaw));
    if (
      timeList === 'TIME' &&
      danceList === 'DANCE' &&
      priceSortSelect === 'PRICE'
    ) {
      setLessonDisplay(lessonRaw);
    } else {
      let newLessonDisplay = oringinRaw.filter((v, i) => {
        if (timeList !== 'TIME') {
          return v.duringtime_begin.slice(5, 7).includes(timeList);
        } else {
          return oringinRaw;
        }
      });
      newLessonDisplay = newLessonDisplay.filter((v, i) => {
        if (danceList !== 'DANCE') {
          return v.type.includes(danceList);
        } else {
          return newLessonDisplay;
        }
      });
      if (priceSortSelect !== 'PRICE') {
        if (priceSortSelect === 'Low') {
          newLessonDisplay = newLessonDisplay.sort((a, b) => {
            return a.price - b.price;
          });
        } else if (priceSortSelect === 'High') {
          newLessonDisplay = newLessonDisplay.sort((a, b) => {
            return b.price - a.price;
          });
        }
      }
      setLessonDisplay(newLessonDisplay);
      // setLessonDisplayDep((prev) => prev + 1);
    }
  };
  const displayTable =
    lessonDisplay.length === 0 ? (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <svg
          className="w-45 h-25"
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
        <p className=" fs-5">There are no courses on the page</p>
      </div>
    ) : (
      lessonDisplay.map((v, i) => {
        return (
          <div
            key={v.sid}
            className=" col-sm-11 col-12 cooler_lesson_card   h-20 d-flex flex-wrap border-bottom "
          >
            <div className=" col-sm-6 col-12">
              <div className="cooler_lesson_card_title_collect d-flex">
                <h5 className="cooler_lesson_card_title w-90">{v.name}</h5>
                {/* <div className="cooler_lesson_card_collect w-10   d-flex justify-content-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-1 w-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div> */}
              </div>
              <p className="cooler_lesson_card_name text-center m-0  ">
                {v.teacher_name}
              </p>
              <div className=" cooler_gray">
                {/* <span>{v.duringtime_begin}</span> */}
                <span>{v.duringtime_begin.slice(5, 7)}</span>
                <span>/</span>
                <span>{v.duringtime_begin.slice(8, 10)}</span>
                <span className=" p-1">-</span>
                <span>{v.duringtime_end.slice(5, 7)}</span>
                <span>/</span>
                <span>{v.duringtime_end.slice(8, 10)}</span>
              </div>
            </div>
            <div className=" cooler_lesson_card_quota_number col-sm-2 col-12 d-flex  align-items-end justify-content-around">
              <span className="cooler_lesson_card_quota fw-bold">剩餘名額</span>

              <span className="cooler_gray ">{v.quota}</span>
            </div>
            <div className="  col-sm-4 col-12 d-flex ">
              <div className="cooler_lesson_card_category_price w-50 h-100 d-flex  flex-column justify-content-between align-items-center ">
                <p className=" cooler_lesson_card_category cooler_gray ">
                  {v.type}
                </p>
                <p className="cooler_lesson_card_price cooler_gray h-13 ">
                  {v.price}
                </p>
              </div>
              <div className="w-50 h-100 d-flex align-items-center justify-content-center  ">
                <div className="w-50 h-50 ms-4 col-sm-6 col-4 d-flex align-items-center justify-content-center">
                  <button
                    disabled={v.quota === 0 ? true : false}
                    style={{
                      fontSize: '.8rem',
                      backgroundColor:
                        v.quota === 0 ? '#373737' : 'var(--main)',
                      color: v.quota === 0 ? 'white' : 'black',
                      boxShadow:
                        v.quota === 0 ? 'none' : '6px 6px 0 0 #61dafb82',
                    }}
                    className={'btn'}
                    onClick={() => {
                      axios
                        .post('http://localhost:3000/carts', {
                          sid: v.sid,
                          quantity: 1,
                          type: 'lesson',
                          memID: loginID,
                        })
                        .then((res) => {
                          if (res.data.success === true) {
                            setCartTotalDep((prev) => prev + 1);
                            alert('課程新增成功');
                          } else {
                            alert('此課程已經在購物車');
                          }
                        });
                    }}
                  >
                    {v.quota === 0 ? 'FULL' : 'BOOK'}
                  </button>
                </div>
                <div className=" col-sm-6 h-100 d-flex justify-content-end">
                  {/* <div className="cooler_lesson_card_collect w-70  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-1 w-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        );
      })
    );

  return <>{displayTable}</>;
}
export default Lesson_card;
