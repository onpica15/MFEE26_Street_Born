import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../../components/AuthContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/RecordCard.scss';
import { useNavigate } from 'react-router-dom';

const RecordCard = ({ products, customized }) => {
  const navigate = useNavigate();
  const { auth, token } = useContext(AuthContext);
  const [recordProducts, setRecordProducts] = useState([]);
  const [recordCustomized, setRecordCustomized] = useState([]);

  // 商品
  useEffect(() => {
    if (!auth) {
      return;
    } else {
      axios
        .get('http://localhost:3000/member/recordproducts', {
          // 發JWT一定要加這個headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRecordProducts(res.data);
        });
      axios
        .get('http://localhost:3000/member/recordcustomized', {
          // 發JWT一定要加這個headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRecordCustomized(res.data);
        });
    }
  }, []);
  // console.log(recordProducts);
  // console.log(recordCustomized);
  return (
    <>
      {/* 商品 */}
      {recordProducts.map((v, i) => {
        return (
          <div className={`w-95 m-3 recordCard ${products}`} key={uuidv4()}>
            <div className="d-flex h-100 w-100">
              <div className="col-3 d-flex justify-content-center align-items-center">
                <img
                  src={`/imgs/Products/${v.img}`}
                  alt=""
                  className="h-85"
                  style={{
                    objectFit: 'cover',
                    aspectRatio: '1/1',
                  }}
                  onClick={() => {
                    navigate(`/PRODUCTS/details/${v.sid}`);
                  }}
                />
              </div>
              <div className="col-9">
                <p
                  className="h-50 p-3 recordName"
                  onClick={() => {
                    navigate(`/PRODUCTS/details/${v.sid}`);
                  }}
                >
                  {v.name}
                </p>
                <div className="h-50 d-flex justify-content-around align-items-center">
                  <h5>{v.order_date}</h5>
                  <h5
                    // className="recordProductsColor"
                    style={{
                      color: `${v.color !== 'White' ? v.color : 'black'}`,
                      // 如果顏色是黑色的話boxShadow顏色改用白色(因為背景是黑色)
                      textShadow: '2px 0px 2px white',
                    }}
                  >
                    {v.color}
                  </h5>
                  <h5>$ {v.price}</h5>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* 客製化商品 */}
      {recordCustomized.map((v, i) => {
        return (
          <div className={`w-95 m-3 recordCard ${customized}`} key={uuidv4()}>
            <div className="d-flex h-100 w-100">
              <div className="col-3 d-flex justify-content-center align-items-center">
                <img
                  src={`http://localhost:3000/custom/${v.back_img}`}
                  alt=""
                  className="h-85"
                  style={{
                    objectFit: 'cover',
                    aspectRatio: '1/1',
                  }}
                  onClick={() => {
                    navigate(`/customized/create/detail/${v.sid}`);
                  }}
                />
              </div>
              <div className="col-9">
                <p
                  className="h-50 p-3 recordName"
                  onClick={() => {
                    navigate(`/customized/create/detail/${v.sid}`);
                  }}
                >
                  {v.custom_product_name}
                </p>
                <div className="h-50 d-flex justify-content-around align-items-center">
                  <h5>{v.order_date}</h5>
                  <h5>$ {v.price}</h5>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RecordCard;
