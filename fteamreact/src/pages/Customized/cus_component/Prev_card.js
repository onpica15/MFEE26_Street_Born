import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../Product/commons/axios';
import { alert } from '../../Carts/Nathan_components/AlertComponent';
import { confirm } from '../../Carts/Nathan_components/ConfirmComponent';
import { gsap } from 'gsap';
import { deleteItemalert } from './DeleteItemComponent';
import { questionalert } from './QuestionComponent';
function Prev_card(props) {
  const { prevdata, singleShareData, setOwnDep, setCartTotalDep } = props;
  // console.log(setCartTotalDep);
  // console.log(singleShareData)
  console.log(prevdata);
  const navigate = useNavigate();

  const bgRef = useRef();
  const titleRef = useRef();
  const boardPicRef = useRef();

  const deleteitem = () => {
    let i = questionalert('刪除物件？');
    i.then((res) => {
      if (res === true) {
        axios
          .delete(`http://localhost:3000/custom/delete?sid=${prevdata.sid}`)
          .then((res) => {
            let i = deleteItemalert('確認刪除');
            i.then((res) => {
              if (res === true) {
                setOwnDep((prev) => prev - 1);
                setCartTotalDep((prev) => prev + 1);
              }
            });
          });
      }
    });
  };

  useEffect(() => {
    gsap.from(bgRef.current, { opacity: 0, y: 100, duration: 1 });
    gsap.from(titleRef.current, { opacity: 0, y: 100, duration: 2 });
    gsap.from(boardPicRef.current, { opacity: 0, x: 100, duration: 1 });
  }, []);

  return (
    <>
      <div className="share-card-con p-3 ">
        <div className="share-card" ref={bgRef}>
          <div className="board" ref={boardPicRef}>
            <img src={`http://localhost:3000/custom/${prevdata.back_img}`} />
          </div>
          <div className="share-right " ref={titleRef}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-1 w-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              strokeWidth="2"
              onClick={deleteitem}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            <img src={'/imgs/Customized/before.png'} className="hover" />
            <h3> {prevdata.custom_product_name}</h3>
            <div className="share-creator">
              <div className="share-ava">
                <img src={prevdata.mem_avatar} />
              </div>
              <div className="share-name">
                <h6>{prevdata.mem_name}</h6>
              </div>
            </div>
            <Link to={`/customized/create/detail/${singleShareData.sid}`}>
              <button className="viv-btn">View</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prev_card;
