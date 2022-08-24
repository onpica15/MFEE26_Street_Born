import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { alert } from '../../../components/AlertComponent';
import { v4 as uuidv4 } from 'uuid';

const Verify = ({
  material,
  setVerify,
  endRegister,
  setMaterial,
  setLoginCard,
  setLoginLogoText,
  setLogoMove,
}) => {
  // 紀錄Email跟驗證碼的值
  const [verification, setVerification] = useState({
    email: material.email,
    verify: '',
  });
  // onChange存值到material
  const handleverifyChange = (e) => {
    setVerification({ ...verification, [e.target.name]: e.target.value });
  };
  // 記錄表單每個欄位有錯誤時的訊息
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    verify: '',
  });

  // 表單檢查，有不合法的驗証出現時會觸發
  const handleInvalid = (e) => {
    // 先阻擋預設行為-泡泡訊息
    e.preventDefault();

    // 填入錯誤訊息
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    });
  };

  // 表單更動時用於讓使用者清空某個正在修改的欄位的錯誤訊息
  const handleFormChange = (e) => {
    setFieldErrors({
      ...fieldErrors,
      [e.target.name]: '',
    });
  };

  // 表單點擊送出後
  async function handleSubmit(e) {
    // 先阻擋預設送出行為
    e.preventDefault();

    const response = await axios.put(
      'http://localhost:3000/member/verify',
      verification
    );

    if (response.data.success === true) {
      alert('帳號開通成功');
      // 呈現註冊頁面
      setVerify(false);
      // 清空欄位
      setMaterial({ ...endRegister });
      // 頭貼狀態設回空字串
      // 卡片翻回去
      setLoginCard('');
      setLoginLogoText('Login');
      setLogoMove(uuidv4());
    } else {
      alert('帳號開通失敗');
    }
  }
  return (
    <>
      <form
        className="w-100 text-white text-center"
        // 表單點擊
        onSubmit={handleSubmit}
        // 表單檢查
        onInvalid={handleInvalid}
        // 表單有更動時
        onChange={handleFormChange}
      >
        <div className="w-100 p-5">
          <h3>Email</h3>
          <input
            type="email"
            name="email"
            className="w-40"
            disabled
            required
            value={verification.email}
            onChange={handleverifyChange}
          />
          <p>{fieldErrors.email}</p>
          <h3>Verification Code</h3>
          <input
            type="text"
            name="verify"
            className="w-40"
            required
            value={verification.verify}
            onChange={handleverifyChange}
          />
          <p>{fieldErrors.verify}</p>
          <div className="h-20 w-100 d-flex justify-content-center">
            <button className="buttonChangePage">CONFIRM</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Verify;
