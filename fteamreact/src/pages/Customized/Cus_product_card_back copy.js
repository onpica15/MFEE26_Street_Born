import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productData } from './ProductData';

import BasicTabs from './cus_component/Cus_tab';
import './Cus_product_card_back.scss';

function Cus_product_card_back(props) {
  const [inputvalue, setInputvalue] = useState('');

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const realRef = useRef();
  const shadowRef = useRef();
  const [cart, setCart] = useState([]);
  const [cache, setCache] = useState({}); // 快取 image 物件

  const addItem = (id) => {
    const item = productData.find((v) => v.id === id); // 找到第一個符合的項目
    if (item) {
      const newItem = { ...item, tid: Date.now() };
      setCart([...cart, newItem]);
    }
  };
  //點擊移除單個物件//
  const removeItem = (tid) => {
    const newCart = cart.filter((v) => v.tid !== tid);
    setCart(newCart);
  };

  const getImageFromPath = (path) => {
    return new Promise((resolve, reject) => {
      if (cache[path]) {
        return resolve(cache[path]); // 回傳已存在的資料
      }

      const img = new Image();
      img.onload = () => {
        resolve(img);
        setCache({ ...cache, [path]: img });
      };
      img.src = path;
    });
  };

  //召喚你的背景！//
  const renderCanvas = async () => {
    const realCtx = realRef.current.getContext('2d');
    const shadowCtx = shadowRef.current.getContext('2d');
    const bg = await getImageFromPath('/imgs/Customized/sk_canvas_bg.png');

    shadowCtx.clearRect(
      0,
      0,
      shadowRef.current.width,
      shadowRef.current.height
    );
    shadowCtx.drawImage(bg, 0, 0);

    const tmpCart = cart.slice(0, 5);
    for (let i = 0; i < tmpCart.length; i++) {
      const img = await getImageFromPath(`/imgs/Customized/${tmpCart[i].img}`);
      shadowCtx.drawImage(img, 0, 0);
    }
    realCtx.drawImage(shadowRef.current, 0, 0);
  };

  //載載看
  function handleDataUrl() {
    let link = document.createElement('a');
    console.log(link);
    link.download = 'yourboard.png';
    link.href = realRef.current.toDataURL('image/png');
    link.click();
  }

  //出來！畫面給我出來！//
  useEffect(() => {
    renderCanvas();
  }, [cart]);

  return (
    <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
      <div className="cus_matte w-100 h-100 ovweflow-hidden">
        <img src="/imgs/Customized/cus_bg_05.jpg" className="cus-bg" alt="" />
      </div>

      <div className="work-area col-12 col-md-10 p-0 overflow-hidden">
        <div className="cus_container">
          <div className="cus-product-container">
            <canvas
              ref={shadowRef}
              width="170"
              height="510"
              style={{ marginLeft: '200px' }}
              hidden
            ></canvas>
            <canvas
              ref={realRef}
              width="170"
              height="510"
              style={{ marginLeft: '200px' }}
            ></canvas>

            {/* <div className="cus_clip">
              <img src="/imgs/Customized/texture.png" alt="" />
            </div> */}
          </div>

          <div className="cus_card_container ">
            <div className="step-control">
              <Link to={'/customized/create/carrier'}>
                <button className="skbtn-prev"></button>
              </Link>

              <Link to={'/customized/create/detail'}>
                <button className="skbtn-next"></button>
              </Link>
            </div>

            <div className="cus_card flex-column">
              <div className="cus-add">
                {cart.map((item) => {
                  return (
                    <div
                      key={item.tid}
                      style={{ display: 'inline-block' }}
                      onClick={() => removeItem(item.tid)}
                    >
                      <img
                        src={`/imgs/Customized/${item.img}`}
                        width="50px"
                        className="cus-add-img"
                        alt={item.name}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="cus_product_card">
                {productData.map((item) => {
                  return (
                    <div
                      key={item.id}
                      style={{ display: 'inline-block' }}
                      onClick={() => addItem(item.id)}
                    >
                      <img
                        src={`/imgs/Customized/${item.img}`}
                        width="48px"
                        alt={item.name}
                      />
                    </div>
                  );
                })}

                <br />

                {/* <BasicTabs /> */}
                <button className="btn btn-black" onClick={handleDataUrl}>
                  download
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
