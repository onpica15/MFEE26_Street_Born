import React, { useState, useEffect,useRef} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Cus_product_card_struct.scss';
import axios from 'axios';
import { gsap } from "gsap";


function Cus_product_card_struct(props) {
  const materialData = [
    { id: 1, materialName: 'black', position: '0' },
    { id: 2, materialName: 'iron', position: '-320px' },
    { id: 3, materialName: 'copper', position: '-640px' },
  ];
  const { lastInsertID, setLastInsertID } = props;
  const [material, setMaterial] = useState('2');
  const navigate =useNavigate()
  const [materialId, setMaterialId] = useState(1);
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(400);

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

  const selectMaterial = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setMaterial(e.target.value);
    }
    if (e.target.value === 'black') {
      setPrice(originalPrice + 800);
    }
    if (e.target.value === 'iron') {
      setPrice(originalPrice + 400);
    }
    if (e.target.value === 'copper') {
      setPrice(originalPrice + 1200);
    }
  };

  const addcarrier = () => {
    axios.post('http://localhost:3000/custom/carrier', {
      sid: lastInsertID,
      carrier: material,
      price:price,
    }).then((res)=>{
      console.log(res.data)
      if(res.data.affectedRows==1){
        navigate('/customized/create/front_deck')

      }
      
    })

  };

  useEffect(() => {
    gsap.from(bgRef.current, { opacity: 0,x:100,duration:2 });
    gsap.from(bgpicRef.current, { opacity: 0, x:-100,duration:2});
    gsap.from(priceRef.current, { opacity: 0, x:-100,duration:2});
    gsap.from(cardRef.current, { opacity: 0, y:100,duration:3});
   
  },[]);
  return (
    <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
      <div className=" w-100 h-100 ovweflow-hidden">
      <div className="cus_matte w-100 h-100 ovweflow-hidden  ">
        <div
          className="bg-train"
          ref={bgRef}
          style={{
                      top:
                        material === 'black'
                          ? '-2800px'
                          : material === 'iron'
                          ? '-1400px'
                          : '0px',
                    }}
          
        >
          <img src="/imgs/Customized/cus_bg_14.jpg" className="cus-bg" />
          <img src="/imgs/Customized/cus_bg_13.jpg" className="cus-bg" />
          <img src="/imgs/Customized/cus_bg_12.jpg" className="cus-bg" />
         
        </div>

    
      </div>
      
        
      </div>

      <div className="work-area col-12 col-md-10 p-0 overflow-hidden">
        <div className="cus_container">
          <div className="cus-product-container">
            <div className="carrier-img">
              <div className="carrier-display" ref={bgpicRef}>
                <div className="carrier-container">
                  <div
                    className="carriers"
                    style={{
                      left:
                        material === 'black'
                          ? '0px'
                          : material === 'iron'
                          ? '-320px'
                          : '-640px',
                    }}
                  >
                    <img src="/imgs/Customized/carrier_black.png" />
                    <img src="/imgs/Customized/carrier_iron.png" />
                    <img src="/imgs/Customized/carrier_copper.png" />
                  </div>
                </div>
                <img
                  src="/imgs/Customized/carrer_bg.png"
                  className="carriers-bg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="cus_card_container ">
            <div className="step-control">
            <div className="price-container m-0 px-3">
                <h4 ref={priceRef}>
                  NT
                  <span className="price">
                  {price}
                    {/* {price === 0 ? originalPrice : price} */}
                  </span>
                </h4>
              </div>

              <div className="links">
                <Link to={'/customized/create/wheel'}>
                  <button className="skbtn-prev"></button>
                </Link>
                <div onClick={addcarrier}>
                  <button className="skbtn-next"></button>
                </div>
              </div>
            </div>

            <div className="cus_card flex-column">
              <div className="cus_product_card" ref={cardRef}>
                <h3 className="text-black">Choose Your Carrier</h3>

                {/* {material} */}
                <div className="carrier-select-control">
                  <label className="carrier-select">
                    <input
                      type="radio"
                      value="black"
                      hidden={true}
                      name="material"
                      onChange={selectMaterial}
                    />
                    <img src="/imgs/Customized/carrier_m_black.png" />
                  </label>
                  <label className="carrier-select">
                    <input
                      type="radio"
                      value="iron"
                      hidden={true}
                      name="material"
                      onChange={selectMaterial}
                    />
                    <img src="/imgs/Customized/carrier_m_iron.png" />
                  </label>
                  <label className="carrier-select">
                    <input
                      type="radio"
                      value="copper"
                      hidden={true}
                      name="material"
                      onChange={selectMaterial}
                    />
                    <img src="/imgs/Customized/carrier_m_copper.png" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cus_product_card_struct;
