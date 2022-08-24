/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React from 'react';
import { confirm } from './ConfirmComponent';
import { alert } from './AlertComponent';
const CustomCard = (props) => {
  const {
    singleItem,
    singleInd,
    customCartItems,
    setCustomCartItems,
    customDep,
    setCustomDep,
  } = props;
  // 拿到單價 & 新數量(更新價錢用)
  const singlePrice = singleItem.item_price / singleItem.quantity;
  const newMinusQty = singleItem.quantity - 1;
  const newPlusQty = singleItem.quantity + 1;
  return (
    <>
      <div className="carts-card">
        <div className="w-100 h-100">
          {/* top grid */}
          <div className="w-100 h-75 d-flex">
            {/* product-img */}
            <div className="w-75 h-100 d-flex">
              <div className="w-50 h-100 d-flex justify-content-center align-items-center">
                <div className="cart-img-wrap">
                  <img
                    className=" w-100 h-100"
                    src={`http://localhost:3000/custom/${singleItem.back_img}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="w-50 h-100 d-flex flex-column justify-content-center carts-item-text-wrap">
                {/* info data */}
                <p className="m-0">{singleItem.custom_product_name}</p>
              </div>
            </div>
            {/* product-price */}
            <div className="w-25 h-100 d-flex align-items-end carts-price-section">
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
                            setCustomDep(customDep + 1);
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
              <p className="w-100 text-center mb-md-0 carts-price">
                $ {singleItem.item_price}
              </p>
            </div>
          </div>
          {/* bottom grid */}
          <div className="w-100 h-25 d-flex justify-content-center align-items-center">
            <div className="w-50 h-75 d-flex justify-content-center mb-md-3">
              {/* minus */}
              <div
                onClick={() => {
                  if (singleItem.quantity - 1 !== 0) {
                    axios
                      .put('http://localhost:3000/carts', {
                        sid: singleItem.item_id,
                        type: singleItem.item_type,
                        quantity: singleItem.quantity - 1,
                        price: singlePrice * newMinusQty,
                        memID: singleItem.member_id,
                      })
                      .then((res) => {
                        if (res.data.success) {
                          setCustomDep(customDep + 1);
                        }
                      });
                  } else {
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
                              setCustomDep(customDep + 1);
                              alert('刪除成功!');
                            }
                          });
                      }
                    });
                  }
                }}
                className="cart-minus-icon cursorpointer mx-3 mx-md-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="cart-count-text">
                <span>{singleItem.quantity}</span>
              </div>

              {/* plus */}
              <div
                onClick={() => {
                  axios
                    .put('http://localhost:3000/carts', {
                      sid: singleItem.item_id,
                      type: singleItem.item_type,
                      quantity: singleItem.quantity + 1,
                      price: singlePrice * newPlusQty,
                      memID: singleItem.member_id,
                    })
                    .then((res) => {
                      // console.log(res.data.success);
                      if (res.data.success) {
                        setCustomDep(customDep + 1);
                      }
                    });
                }}
                className="cart-plus-icon cursorpointer mx-3 mx-md-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomCard;
