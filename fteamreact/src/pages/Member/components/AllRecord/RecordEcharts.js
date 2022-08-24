import React, { useState, useEffect, useContext } from 'react';
import ReactEcharts from 'echarts-for-react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../components/AuthContext';
import axios from 'axios';
import '../../styles/RecordEcharts.scss';

const RecordEcharts = () => {
  // 判斷有吳登入 要fetch的token
  const { auth, token } = useContext(AuthContext);
  // 頁面導向
  const navigate = useNavigate();
  // 接住所有會員買過的商品紀錄
  const [productsColor, setProductsColor] = useState([]);
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
          setProductsColor(res.data);
        });
    }
  }, [auth, token]);

  // 取得顏色數量的方式
  // console.log(
  //   Object.values(productsColor).filter((v, i) => {
  //     return v.color === 'green';
  //   }).length
  // );

  // 白色商品在陣列中的長度(數量)
  const whiteLength = Object.values(productsColor).filter((v, i) => {
    return v.color === 'Withe';
  }).length;
  // 黑色商品在陣列中的長度(數量)
  const blackLength = Object.values(productsColor).filter((v, i) => {
    return v.color === 'Black';
  }).length;
  // 藍色商品在陣列中的長度(數量)
  const blueLength = Object.values(productsColor).filter((v, i) => {
    return v.color === 'Blue';
  }).length;
  // 綠色商品在陣列中的長度(數量)
  const greenLength = Object.values(productsColor).filter((v, i) => {
    return v.color === 'Green';
  }).length;
  // 黃色商品在陣列中的長度(數量)
  const yellowLength = Object.values(productsColor).filter((v, i) => {
    return v.color === 'Yellow';
  }).length;
  // 橘色商品在陣列中的長度(數量)
  const orangeLength = Object.values(productsColor).filter((v, i) => {
    return v.color === 'Orange';
  }).length;
  // 紅色商品在陣列中的長度(數量)
  const redLength = Object.values(productsColor).filter((v, i) => {
    return v.color === 'Red';
  }).length;
  // 粉紅色商品在陣列中的長度(數量)
  const pinkLength = Object.values(productsColor).filter((v, i) => {
    return v.color === 'Pink';
  }).length;
  // 紫色商品在陣列中的長度(數量)
  const purpleLength = Object.values(productsColor).filter((v, i) => {
    return v.color === 'Purple';
  }).length;

  const option = {
    tooltip: {
      trigger: 'item',
    },
    // 圓餅圖大小
    height: '450px',
    legend: {
      left: 'center',
    },
    series: [
      {
        // 圓餅圖距離上方文字的間隔
        top: '5%',
        name: 'Products Proportion',
        type: 'pie',
        color: [
          'white',
          'black',
          'blue',
          'green',
          'yellow',
          'orange',
          'red',
          'pink',
          'purple',
        ],
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          // borderColor: '#61dafb',
          borderColor: 'white',
          borderWidth: 3,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          // 數量不是0再顯示
          // whiteLength !== 0 ? { value: whiteLength, name: 'White' } : '',
          // blackLength !== 0 ? { value: blackLength, name: 'Black' } : '',
          // blueLength !== 0 ? { value: blueLength, name: 'Blue' } : '',
          // greenLength !== 0 ? { value: greenLength, name: 'Green' } : '',
          // yellowLength !== 0 ? { value: yellowLength, name: 'Yellow' } : '',
          // orangeLength !== 0 ? { value: orangeLength, name: 'Orange' } : '',
          // redLength !== 0 ? { value: redLength, name: 'Red' } : '',
          // pinkLength !== 0 ? { value: pinkLength, name: 'Pink' } : '',
          // purpleLength !== 0 ? { value: purpleLength, name: 'Purple' } : '',
          { value: whiteLength, name: 'White' },
          { value: blackLength, name: 'Black' },
          { value: blueLength, name: 'Blue' },
          { value: greenLength, name: 'Green' },
          { value: yellowLength, name: 'Yellow' },
          { value: orangeLength, name: 'Orange' },
          { value: redLength, name: 'Red' },
          { value: pinkLength, name: 'Pink' },
          { value: purpleLength, name: 'Purple' },
        ],
      },
    ],
  };
  return (
    <>
      <div className="h-75">
        <ReactEcharts option={option} style={{ height: '100%', top: '10%' }} />
      </div>
      <div className="ehartsBTNBOX d-flex justify-content-center align-items-center">
        <button
          className="ehartsBTN"
          onClick={(e) => {
            e.preventDefault();
            // 頁面轉向訂單頁面
            navigate('/ORDERS', { replace: true });
          }}
        >
          More detail
        </button>
      </div>
    </>
  );
};

export default RecordEcharts;
