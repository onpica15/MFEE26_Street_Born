// 製作區域前置參考
// 呈現區域
import React, { useEffect } from 'react';

// 引入過場動畫
// import { useSpinner } from '../../components/useSpinner/useSpinner';

const Sample = () => {
  // useSpinner裡面設定過場動畫要多久 以毫秒為單位 此範例為4秒
  // const { spinner, setLoading } = useSpinner(4000);

  // setLoading(true);放入進頁面讀取資料的生命週期裡面
  // useEffect(() => {
  //   setLoading(true);
  // }, []);

  // 在下方return的第一行放入{spinner}
  return (
    <>
      {/* {spinner} */}
      <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area col-12 col-md-10 p-0">
          大家製作放這邊～～～～
        </div>
      </div>
    </>
  );
};

export default Sample;
