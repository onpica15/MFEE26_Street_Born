import axios from 'axios';
import React, { useState } from 'react';
import '../Orders.scss';
import OrderDetailCard from './OrderDetailCard';
const OrderCard = (props) => {
  const { singleOrder } = props;
  const [allDetailItems, setAllDetailItems] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const isShowDetailHandler = () => {
    // console.log(singleOrder);
    axios
      .get(`http://localhost:3000/orders/detail?orderID=${singleOrder.sid}`)
      .then((res) => {
        setAllDetailItems(res.data);
      });
    setShowDetail(!showDetail);
  };
  return (
    <div className="order-card-wrap" onClick={isShowDetailHandler}>
      <div className="order-card-main w-95 d-flex flex-column justify-content-center">
        <div className="w-100 h-45 d-flex">
          <div className="col-6 h-100 d-flex justify-content-start align-items-end py-2">
            {/* created_at */}
            訂購日 ：{singleOrder.order_date.slice(0, 10)}
          </div>
          <div className="col-6 h-100 d-flex justify-content-end align-items-end py-2 fw-bold">
            {/* oreder_number */}
            No.{singleOrder.sid}
          </div>
        </div>
        <div className={`w-100 ${showDetail ? '' : 'hr-div'}`}>
          <div
            style={{
              opacity: showDetail ? '1' : '0',
              height: showDetail ? '300px' : '1px',
              transition: showDetail ? '.3s' : 'none',
            }}
            className="order-card-detail w-100"
          >
            <OrderDetailCard allDetailItems={allDetailItems} />
          </div>
        </div>
        <div className="w-100 h-45 d-flex">
          <div className="col-6 h-100 d-flex justify-content-start align-items-start py-2">
            付款方式 ：{' '}
            {singleOrder.pay_method.toUpperCase() === 'CREDIT'
              ? 'CREDIT CARD'
              : singleOrder.pay_method.toUpperCase()}
          </div>
          <div className="col-6 h-100 d-flex justify-content-end align-items-start py-2 fw-bold">
            Total ： $ {singleOrder.total}
          </div>
        </div>
        <span
          style={{ display: !showDetail ? 'block' : 'none' }}
          className="recipient"
        >
          收件人 ： {singleOrder.recipient}
        </span>
        <span
          style={{ display: !showDetail ? 'block' : 'none' }}
          className="shipping"
        >
          寄送方式 ：
          {singleOrder.shipping_method === 'toHome' ? ' 宅配' : ' 7-11超取'}
        </span>
        <span
          style={{ display: !showDetail ? 'block' : 'none' }}
          className="convence-address"
        >
          {singleOrder.shipping_method === 'pickSelf'
            ? '門市名稱 ：' + singleOrder.address.slice(6, 10)
            : ''}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
