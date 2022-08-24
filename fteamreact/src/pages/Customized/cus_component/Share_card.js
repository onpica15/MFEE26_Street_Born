import React,{useEffect,useRef} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../Product/commons/axios';
import { gsap } from 'gsap';

function Share_card(props) {
  const { singleShareData, shareCardId } = props;
  // console.log(singleShareData);
  const navigate = useNavigate();

  const bgRef = useRef();
  const titleRef = useRef();
  const boardPicRef = useRef();

  useEffect(() => {
    gsap.from(bgRef.current, { opacity: 0,y:100,duration:1});
    gsap.from(titleRef.current, { opacity: 0, y:50,duration:2});
    gsap.from(boardPicRef.current, { opacity: 0, x:50,duration:1});
  },[]);

  return (
    <>
      <div className="share-card-con p-3 ">
        <div className="share-card" ref={bgRef}>
          <div className="board" ref={boardPicRef}>
            <img
              src={`http://localhost:3000/custom/${singleShareData.back_img}`}
            />
          </div>
          <div className="share-right " ref={titleRef}>
          <img src={'/imgs/Customized/before.png'} className="hover" />
            <h3> {singleShareData.custom_product_name}</h3>
            <div className="share-creator">
              <div className="share-ava">
                <img
                  src={singleShareData.mem_avatar}
                />
              </div>
              <div className="share-name">
                <h6>{singleShareData.mem_name}</h6>
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

export default Share_card;
