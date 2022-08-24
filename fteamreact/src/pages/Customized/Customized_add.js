import React, { useState, useContext,useRef,useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Cus_product_card from './Cus_product_card_sample';
import Cus_product_card_wheel from './Cus_product_card_wheel';
import Cus_product_card_fcolor from './Cus_product_card_fcolor';
import Cus_product_card_name from './Cus_product_card_name';
import axios from 'axios';
import AuthContext from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { gsap } from "gsap";

function Customized_add(props) {
  const { auth, token } = useContext(AuthContext);

  const { lastInsertID, setLastInsertID } = props;
  const navigate =useNavigate()
  const [member_id, setMember_id] = useState('');
  const [custom_product_name, setCustom_product_name] = useState('');
  const [wheel_style, setWheel_style] = useState('');
  const [carrier, setCarrier] = useState('');
  const [front_color, setFront_color] = useState('');
  const [back_style, setBack_style] = useState('');
  const [back_pattern, setBack_pattern] = useState('');
  const [back_color, setBack_color] = useState('');
  const [back_text, setBack_text] = useState('');
  const [back_sticker, setBack_sticker] = useState('');
  const [back_img, setBack_img] = useState('');
  const [price, setPrice] = useState(1980);
  const [created_date, setCreated_date] = useState('');



  const bgRef = useRef();
  const bgpicRef = useRef();
  const priceRef = useRef();
  const cardRef = useRef();
  

  const addCustome = () => {
    axios
      .get('http://localhost:3000/member/memberself', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        axios
          .post('http://localhost:3000/custom', {
            member_id: res.data.sid,
            custom_product_name: custom_product_name,
            wheel_style: wheel_style,
            carrier: carrier,
            front_color: front_color,
            back_style: back_style,
            back_pattern: back_pattern,
            back_color: back_color,
            back_text: back_text,
            back_sticker: back_sticker,
            back_img: back_img,
            price: price,
            // created_date:created_date
          }).then((res)=>{
            if(res.data.affectedRows === 1){
              console.log('333',res.data);
              setLastInsertID(res.data.insertId);
            }
          }).then(()=>{
            navigate('/customized/create/wheel')
          })
         
      });

   
  };

  useEffect(() => {
    gsap.from(bgRef.current, { opacity: 0,x:100,duration:1});
    gsap.from(bgpicRef.current, { opacity: 0, y:100,duration:2});
    gsap.from(priceRef.current, { opacity: 0, x:-100,duration:2});
    gsap.from(cardRef.current, { opacity: 0, y:100,duration:3});
  },[]);



  return (
    <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
      <div className="cus_matte w-100 h-100 ovweflow-hidden" >
        <img src="/imgs/Customized/cus_bg_05.jpg" className="cus-bg" ref={bgRef} />
      </div>

      <div className="work-area col-12 col-md-10 p-0 overflow-hidden">
        <div className="cus_container">
          <div className="w-100 vh-mb-100 h-100">
            <div className="cus-product-container">
              <div className="main_img_container">
                <img
                  src="/imgs/Customized/cus_name_board.png"
                  className="cus_board_main"
                  ref={bgpicRef}
                />
              </div>
            </div>
          </div>

          <div className="cus_card_container">
            <div className="step-control">
              <div className="price-container m-0 px-3">
                <h4 ref={priceRef}>
                  NT<span className="price">{price}</span>
                </h4>
              </div>

              <div class="links">
                <Link to={'/customized/create'}>
                  <button className="skbtn-prev"></button>
                </Link>
                <div onClick={addCustome}>
                  <button className="skbtn-next"></button>
                </div>

                {/* <Link to={'/customized/create/wheel'} onClick={addCustome}>
                  <button className="skbtn-next"></button>
                </Link> */}
              </div>
            </div>

            <div className="cus_card" ref={cardRef}>
              <div className="cus_product_card">
                <h3 className="text-black">Project Name</h3>

                <input
                  type="text"
                  placeholder="Give your board a name"
                  className="viv-input"
                  onChange={(event) => {
                    setCustom_product_name(event.target.value);
                    
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customized_add;
