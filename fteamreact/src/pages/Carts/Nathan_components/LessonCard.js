/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import { confirm } from './ConfirmComponent';
import { alert } from './AlertComponent';
import './LessonCard.scss';
const LessonCard = (props) => {
  const {
    singleItem,
    lessonCartItems,
    setLessonCartItems,
    lessonDep,
    setLessonDep,
  } = props;
  return (
    <>
      <div className="carts-card d-flex">
        <div className="col-4 h-100 d-flex flex-column justify-content-around align-items-center">
          <div className="w-90 h-25 text-center lesson-title">Dance Style</div>
          <div className="w-90 h-65 d-flex justify-content-center align-items-center">
            <span title={singleItem.name} className="lesson-name-text">
              {singleItem.name}
            </span>
          </div>
        </div>
        <div className="col-3 h-100 d-flex flex-column justify-content-around align-items-center">
          <div className="w-90 h-25 text-center lesson-title">Begin</div>
          <div className="w-90 h-65 d-flex justify-content-center align-items-center">
            <span className="lesson-name-text">
              {singleItem.duringtime_begin.slice(0, 8) +
                (parseInt(singleItem.duringtime_begin.slice(8, 10)) + 1)}
            </span>
          </div>
        </div>
        <div className="col-3 h-100 d-flex flex-column justify-content-around align-items-center">
          <div className="w-90 h-25 text-center lesson-title">End</div>
          <div className="w-90 h-65 d-flex justify-content-center align-items-center">
            <span className="lesson-name-text">
              {singleItem.duringtime_end.slice(0, 8) +
                (parseInt(singleItem.duringtime_end.slice(8, 10)) + 1)}
            </span>
          </div>
        </div>

        <div className="col-2 h-100 d-flex flex-column justify-content-between">
          <div className="w-100 h-30 text-end lesson-close-wrap">
            <a
              style={{ cursor: 'pointer' }}
              onClick={() => {
                let i = confirm('確定要刪除此商品嗎？');
                i.then((res) => {
                  if (res === true) {
                    axios
                      .delete(
                        `http://localhost:3000/carts?sid=${singleItem.item_id}&type=${singleItem.item_type}&memID=${singleItem.member_id}`
                      )
                      .then((res) => {
                        console.log(res.data);
                        if (res.data.success) {
                          setLessonDep(lessonDep + 1);
                          alert('刪除成功!');
                        }
                      });
                  }
                });
              }}
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>
          </div>
          <div className="w-100 h-40 d-flex justify-content-end align-items-end">
            <span className="lesson-price-text">{singleItem.location}</span>
          </div>
          <div className="w-100 h-30 d-flex justify-content-end align-items-center">
            <span className="lesson-price-text">${singleItem.item_price}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonCard;
