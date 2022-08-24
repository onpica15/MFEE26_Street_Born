import React from 'react';
import Scroll from 'react-scroll';

const OrderDetailCard = (props) => {
  const { allDetailItems } = props;

  return (
    <div className="w-100 h-100">
      <Scroll.Element className="orders-detail-card-scroll">
        {allDetailItems.map((v, i) => {
          return (
            <div
              key={v.sid}
              className="w-100 d-flex mt-md-3 mt-2 detail-single-item-wrap"
            >
              <div className="w-50 h-100 d-flex flex-column justify-content-between">
                {/* 商品名稱 */}
                <div className="w-100 h-33 px-3">Product Number</div>
                {/* 商品類型 */}
                <div className="w-100 h-33 px-3">Type</div>
                <div className="w-100 h-33 fw-bold px-3">
                  Qty : {v.quantity}
                </div>
              </div>
              <div className="w-50 h-100 d-flex flex-column justify-content-between">
                <div className="w-100 h-33 px-3 fw-bold text-end px-3">
                  {v.item_id}
                </div>
                {/* item_type */}
                <div className="w-100 h-33 fw-bold text-end px-3">
                  {v.item_type.toUpperCase() === 'CUSTOM'
                    ? 'CUSTOMIZED'
                    : v.item_type.toUpperCase()}
                </div>
                <div className="w-100 h-33 fw-bold text-end px-3">
                  $ {v.price}
                </div>
              </div>
            </div>
          );
        })}
      </Scroll.Element>
    </div>
  );
};

export default OrderDetailCard;
