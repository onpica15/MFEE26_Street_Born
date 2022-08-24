import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { productData } from './ProductData';
import { useNavigate } from 'react-router-dom';
import Cus_tab from './cus_component/Cus_tab';
import './Cus_product_card_back.scss';
import { Scale } from 'chart.js';
import axios from 'axios';
import { gsap } from 'gsap';
import { alert } from '../Carts/Nathan_components/AlertComponent';
import {SpaceAlert}from './cus_component/SpaceAlertComponent'

function Cus_product_card_back(props) {
  const navigate = useNavigate();
  const { lastInsertID, setLastInsertID } = props;
  const cuscanvas = useRef(null);
  const [bgimg, setBgimg] = useState('');
  const [bgimgName, setBgimgName] = useState('style_01');
  const [bgcolor, setBgcolor] = useState('#123456');
  const [pattern, setPattern] = useState('');
  const [patternName, setPatternName] = useState('Parallel');
  const [sticker, setSticker] = useState('');
  const [stickerName, setStickerName] = useState('Waves');
  const [text, setText] = useState('SAMPLE');
  const [isClick, setIsClick] = useState(false);
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);

  const [bgimgdep, setBgimgdep] = useState(0);

  const flowRef = useRef();
  const flow2Ref = useRef();

  const bgRef = useRef();
  const bgpicRef = useRef();
  const priceRef = useRef();
  const cardRef = useRef();

  //取得價錢//
  useEffect(() => {
    console.log(lastInsertID);
    axios
      .get(`http://localhost:3000/custom/price?sid=${lastInsertID}`)
      .then((res) => {
        console.log('111', res.data[0].price);

        setOriginalPrice(+res.data[0].price);
        setPrice(+res.data[0].price);
      });
  }, []);

  //進場效果//
  useEffect(() => {
    gsap.from(bgRef.current, { opacity: 0, x: 100, duration: 2 });
    gsap.from(bgpicRef.current, { opacity: 0, x: -100, duration: 2 });
    gsap.from(priceRef.current, { opacity: 0, x: -100, duration: 2 });
    gsap.from(cardRef.current, { opacity: 0, y: 100, duration: 3 });
  }, []);

  //canvas喔喔喔//
  useEffect(() => {
    const backimg = new Image();
    backimg.src = `/imgs/Customized/${bgimgName}.png`;
    // backimg.src = '/imgs/Customized/style_01.png';

    const patternimg = new Image();
    patternimg.src = `/imgs/Customized/pattern/${patternName}.png`;
    // patternimg.src = '/imgs/Customized/pattern/Parallel.png';

    const stickerimg = new Image();
    stickerimg.src = `/imgs/Customized/sticker/${stickerName}.png`;
    // stickerimg.src = "/imgs/Customized/sticker/Waves.png";

    backimg.onload = () => {
      setBgimg(backimg);
      setPattern(patternimg);
      setSticker(stickerimg);
    };
  }, [bgimgName, patternName, stickerName]);

  useEffect(() => {
    // const ctx = cuscanvas.current.getContext("2d");
    // ctx.fillStyle = '#123456';
    // ctx.fillRect(0, 0, 500, 500);

    if (bgimg && cuscanvas) {
      const ctx = cuscanvas.current.getContext('2d');
      //剪裁滑板遮罩//
      ctx.beginPath();
      ctx.roundRect(200, 0, 120, 500, 60);
      ctx.clip();

      //背景圖//
      ctx.fillStyle = bgcolor;
      ctx.fillRect(0, 0, 600, 600);

      //圖樣選擇//

      ctx.drawImage(pattern, 135, 240, 250, 250);
      ctx.drawImage(bgimg, 180, 0, 250, 250);
      ctx.drawImage(sticker, 80, 50, 400, 400);

      //字型顏色//
      ctx.font = 'bold 24px Montserrat';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.strokeStyle = 'white';
      ctx.fillText(text, 200, 100);
      ctx.fillText(text, 200, 115);
      ctx.fillText(text, 200, 130);
      ctx.font = 'bold 48px Montserrat';

      ctx.strokeText(text, 200, 90);
      ctx.strokeText(text, 200, 130);
      ctx.strokeText(text, 200, 170);
    }
  }, [bgimg, cuscanvas, bgcolor, pattern, text]);

  const addback = () => {
    // console.log(frontcolor)
    if (isClick) {
      axios.post('http://localhost:3000/custom/back', {
        sid: lastInsertID,
        back_style: bgimgName,
        back_pattern: patternName,
        back_color: bgcolor,
        back_text: text,
        back_sticker: stickerName,
        price: price,
      });
      navigate('/customized/create/confirm');
    } else {
      SpaceAlert('please confirm your picture');
    }
  };

  function handleDataUrl() {
    let link = document.createElement('a');
    console.log(link);
    link.download = 'yourboard.png';
    link.href = cuscanvas.current.toDataURL('image/png');
    link.click();

    axios.post('http://localhost:3000/custom/upload', {
      sid: lastInsertID,
      imgData: cuscanvas.current.toDataURL('image/png'),
    });
    setIsClick(true);
  }

  //前方效果//
  useEffect(() => {
    gsap.from(flowRef.current, { scale: 0,rotation:-45, duration: 0.5 });
    gsap.from(flow2Ref.current, { scale: 0, rotation:45,duration: 0.5 });
  }, [bgimgName]);

  return (
    <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
      <div ref={flowRef} className="cus_flow">
        <img src={`/imgs/Customized/flow/${bgimgName}.png`} alt="" />
      </div>
      <div ref={flow2Ref} className="cus_flow2">
        <img src={`/imgs/Customized/flow/${bgimgName}.png`} alt="" />
      </div>
      <div className="cus_matte w-100 h-100 ovweflow-hidden">
        <img
          src="/imgs/Customized/cus_bg_07.jpg"
          className="cus-bg"
          alt=""
          ref={bgRef}
        />
      </div>

      <div className="work-area col-12 col-md-10 p-0 overflow-hidden">
        <div className="cus_container">
          <div className="cus-product-container" ref={bgpicRef}>
            <div className="scale">
              <canvas ref={cuscanvas} width={500} height={500} />
            </div>
          </div>

          <div className="cus_card_container ">
            <div className="step-control">
              <div className="price-container m-0 px-3">
                <h4 ref={priceRef}>
                  NT
                  <span className="price">
                    {price === 0 ? originalPrice : price}
                  </span>
                </h4>
              </div>

              <div className="links">
                <Link to={'/customized/create/carrier'}>
                  <button className="skbtn-prev"></button>
                </Link>
                <div onClick={addback}>
                  <button className="skbtn-next"></button>
                </div>
              </div>
            </div>

            <div className="cus_card flex-column">
              <div className="cus_product_card" ref={cardRef}>
                <div className="d-flex"></div>
                {/* {bgimgName}
                {patternName}
                {stickerName}
                {text} */}

                <Cus_tab
                  bgcolor={bgcolor}
                  setBgcolor={setBgcolor}
                  bgimgName={bgimgName}
                  setBgimgName={setBgimgName}
                  patternName={patternName}
                  setPatternName={setPatternName}
                  setStickerName={setStickerName}
                  setText={setText}
                  setPrice={setPrice}
                  originalPrice={originalPrice}
                  setBgimgdep={setBgimgdep}
                />

                <button
                  className="btn btn-outline-dark"
                  onClick={handleDataUrl}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cus_product_card_back;
