import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from '../commons/axios';
const ProductTabsBoxItem2 = (props) => {
  const { priceData } = props;
  const data = [
    {
      name: 'Jul',
      uv: 100,
      amt: 0,
    },
    {
      name: 'Aug',
      uv: 100,
      amt: 150,
    },
    {
      name: 'Mar',
      uv: 100,
      amt: 0,
    },
    {
      name: 'Apr',
      uv: 100,
      amt: 150,
    },
    {
      name: 'May',
      uv: 100,
      amt: 0,
    },
    {
      name: 'Jun',
      uv: 100,
      amt: 150,
    },
  ];

  priceData.map((r, i) => {
    data[i].uv = r.quantity;
    switch (r.orderData) {
      case 1:
        r.orderData = 'Jan';
        break;
      case 2:
        r.orderData = 'Feb';
        break;
      case 3:
        r.orderData = 'Mar';
        break;
      case 4:
        r.orderData = 'Apr';
        break;
      case 5:
        r.orderData = 'May';
        break;
      case 6:
        r.orderData = 'Jun';
        break;
      case 7:
        r.orderData = 'Jul';
        break;
      case 8:
        r.orderData = 'Aug';
        break;
      case 9:
        r.orderData = 'Sep';
        break;
      case 10:
        r.orderData = 'Oct';
        break;
      case 11:
        r.orderData = 'Nov';
        break;
      case 12:
        r.orderData = 'Dec';
        break;
      default:
        r.orderData = 0;
    }
    data[i].name = r.orderData;
  });

  return (
    <div className="col-12 w-100 h-100">
      <ResponsiveContainer width="100%" height={360}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis dataKey="amt" />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#61dafb" fill="#61dafb" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductTabsBoxItem2;
