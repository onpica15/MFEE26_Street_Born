import React from 'react';
import { Link } from 'react-router-dom';
import './CheckoutFinish.scss';

const CheckoutFinish = (props) => {
  const { newOrderNumber } = props;
  return (
    <div className="w-100 h-100 d-flex flex-column">
      <div className=" w-100 h-30 d-flex justify-content-center align-items-end">
        <div className="w-50 h-70">
          <div className="w-100 h-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 w-100 h-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#61dafb"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="w-100 h-40 d-flex justify-content-center align-items-center">
            <span className="text-main">SUCCESS!!</span>
          </div>
        </div>
      </div>
      <div className=" w-100 h-70 d-flex flex-column justify-content-between">
        <div className="w-100 h-60">
          <div className="w-100 h-30 d-flex justify-content-center align-items-center">
            {/* 帶入資料庫訂單編號 */}
            <span className="text-gray">訂單編號 : {newOrderNumber}</span>
          </div>
          <div className="w-100 h-70  text-gray text-setting">
            商品之實際配貨日期、退換貨日期，依我們向您另行通知之內容為準。
            因商品屬性關係，將有專人與您約定送貨時間(可約定出貨日30天內日期)。※若為預購商品，以下單日網頁公告之配送日期，於一個工作天內（不含例假日）與您約定送貨時間。
          </div>
        </div>
        <div className="check-orders w-100 h-10 d-flex justify-content-center">
          {/* 連到訂單頁面 */}
          <Link className="text-main text-decoration-none" to="/orders">
            查看訂單
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFinish;
