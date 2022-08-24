import React, { useState, useContext } from 'react';
import '../../styles/PasswordEdit.scss';
import axios from 'axios';
import AuthContext from '../../../../components/AuthContext';
import { alert } from '../../../../components/AlertComponent';

const PasswordEdit = ({ setmoveTrain }) => {
  const { token, logout } = useContext(AuthContext);
  // 記錄表單每個欄位輸入值
  const [material, setMaterial] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  // 離開這個表單時，如沒變更資料把欄位恢復成最初始值
  const [leaveForm, setLeaveForm] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  // onChange存值到material
  const handleMaterialChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };
  // 記錄表單每個欄位有錯誤時的訊息
  const [materialErrors, setMaterialErrors] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  // 離開這個表單時，把錯誤訊息清空用
  const [leaveFormError, setLeaveFormError] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  // 表單檢查，有不合法的驗証出現時會觸發
  const handleInvalid = (e) => {
    // 先阻擋預設行為-泡泡訊息
    e.preventDefault();

    // 填入錯誤訊息
    setMaterialErrors({
      ...materialErrors,
      [e.target.name]: e.target.validationMessage,
    });
  };
  // 表單更動時用於讓使用者清空某個正在修改的欄位的錯誤訊息
  const handleFormChange = (e) => {
    setMaterialErrors({
      ...materialErrors,
      [e.target.name]: '',
    });
  };
  // 表單點擊送出後
  async function handleSubmit(e) {
    // 先阻擋預設送出行為
    e.preventDefault();
    // 如果新密碼與確認密碼不一樣
    if (material.newPassword !== material.confirmPassword) {
      // 填入錯誤訊息
      setMaterialErrors({
        ...materialErrors,
        newPassword: '密碼與確認密碼不符',
        confirmPassword: '密碼與確認密碼不符',
      });

      return;
    }

    await axios
      .put(
        'http://localhost:3000/member/password',
        { password: material.password, newPassword: material.newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          let i = alert('更新成功，請重新登入');
          i.then((res) => {
            if (res) {
              logout();
            }
          });
        } else {
          alert('密碼更新失敗');
        }
      });
  }
  return (
    <>
      <div className="h-100 d-flex justify-content-center align-items-center">
        {/* 修改密碼 */}
        <div className="w-80 passwordEdit">
          <form
            className="text-center"
            // 表單點擊
            onSubmit={handleSubmit}
            // 表單檢查
            onInvalid={handleInvalid}
            // 表單有更動時
            onChange={handleFormChange}
          >
            <h4>User Password</h4>
            <input
              type="password"
              name="password"
              autoComplete="off"
              required
              value={material.password}
              onChange={handleMaterialChange}
            />
            <p>{materialErrors.password}</p>
            <h4>New Password</h4>
            <input
              type="password"
              name="newPassword"
              autoComplete="off"
              required
              value={material.newPassword}
              onChange={handleMaterialChange}
            />
            <p>{materialErrors.newPassword}</p>
            <h4>Re-enter Password</h4>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="off"
              required
              value={material.confirmPassword}
              onChange={handleMaterialChange}
            />
            <p>{materialErrors.confirmPassword}</p>
            <div className="d-flex justify-content-around">
              <button
                onClick={(e) => {
                  // 阻擋按鈕預設行為
                  e.preventDefault();
                  // 如未更改資料 把表單恢復成原來的值
                  setMaterial(leaveForm);
                  // 移動到顯示個人資料
                  setmoveTrain('translateY(0%)');
                  // 離開這個表單時把錯誤訊息清空
                  setMaterialErrors(leaveFormError);
                }}
              >
                Back
              </button>
              <button>Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordEdit;
