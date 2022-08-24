import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';

function OrderMuiTabs(props) {
  const { setAllOrders, loginMemberID } = props;
  const [orderSearch, setOrderSearch] = useState('');
  const orderSearchHandler = (e) => {
    // console.log(e.target.value);
    setOrderSearch(e.target.value);
    axios
      .get(
        `http://localhost:3000/orders/search?memID=${loginMemberID}&search=${e.target.value}`
      )
      .then((res) => {
        if (res.data.success) {
          setAllOrders(res.data.result);
        }
      });
  };
  const keyPressHandler = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'black', position: 'relative' }}>
        <Tabs value={'ORDERS'} aria-label="basic tabs example">
          <Tab
            sx={{ fontSize: '1.1rem' }}
            disableRipple={true}
            label="ORDERS"
            value={'ORDERS'}
          />
        </Tabs>
        <div className="order-search-wrap">
          <div className="w-100 h-90 d-flex justify-content-end align-items-end">
            <div className="search">
              <input
                onKeyPress={keyPressHandler}
                className="search-txt"
                type="text"
                placeholder="No :"
                value={orderSearch}
                onChange={orderSearchHandler}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}
export default OrderMuiTabs;
