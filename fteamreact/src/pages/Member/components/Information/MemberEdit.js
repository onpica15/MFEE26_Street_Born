import React, { useState, useContext, useEffect } from 'react';
import '../../styles/MemberEdit.scss';
import axios from 'axios';
import AuthContext from '../../../../components/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { alert } from '../../../../components/AlertComponent';
import { confirm } from '../../../../components/ConfirmComponent';

const MemberEdit = ({
  setmoveTrain,
  setAvatarFromNone,
  setInformationWrap,
  member,
  editFromNone,
}) => {
  const { token, auths, setAuths, logout } = useContext(AuthContext);
  // 記錄表單每個欄位輸入值
  const [material, setMaterial] = useState({
    account: '',
    name: '',
    nickname: '',
    birthday: '',
    mobile: '',
    email: '',
    address: '',
  });
  // 離開這個表單時，如沒變更資料把欄位恢復成最初始值
  const [leaveForm, setLeaveForm] = useState([]);
  useEffect(() => {
    // 取出表單需要顯示的值
    const {
      mem_account,
      mem_name,
      mem_nickname,
      mem_birthday,
      mem_mobile,
      mem_email,
      mem_address,
    } = member;
    if (member.length === 0) {
      return;
    }
    setMaterial({
      account: mem_account,
      name: mem_name,
      nickname: mem_nickname,
      birthday: mem_birthday,
      mobile: mem_mobile,
      email: mem_email,
      address: mem_address,
    });
    setLeaveForm({
      account: mem_account,
      name: mem_name,
      nickname: mem_nickname,
      birthday: mem_birthday,
      mobile: mem_mobile,
      email: mem_email,
      address: mem_address,
    });
  }, [member]);
  // onChange存值到material
  const handleMaterialChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };
  // 記錄表單每個欄位有錯誤時的訊息
  const [fieldErrors, setMaterialErrors] = useState({
    name: '',
    account: '',
    email: '',
    mobile: '',
  });
  // 離開這個表單時，把錯誤訊息清空用
  const [leaveFormError, setLeaveFormError] = useState({
    name: '',
    account: '',
    email: '',
    mobile: '',
  });
  // 表單檢查，有不合法的驗証出現時會觸發
  const handleInvalid = (e) => {
    // 先阻擋預設行為-泡泡訊息
    e.preventDefault();

    // 填入錯誤訊息
    setMaterialErrors({
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    });
  };
  // 表單更動時用於讓使用者清空某個正在修改的欄位的錯誤訊息
  const handleFormChange = (e) => {
    setMaterialErrors({
      ...fieldErrors,
      [e.target.name]: '',
    });
  };
  // 表單點擊送出後
  async function handleSubmit(e) {
    // 先阻擋預設送出行為
    e.preventDefault();

    // 作更多驗証
    if (material.name.length < 2) {
      // 填入錯誤訊息
      setMaterialErrors({
        ...fieldErrors,
        name: '最少兩個字',
      });

      return;
    }

    await axios
      .put('http://localhost:3000/member/edit', material, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          // 把表單改成修改後的樣子
          setLeaveForm({ ...res.data.body });
          // 讓NavBar的顯示跟著做即時變動
          setAuths({ ...auths, change: uuidv4() });
          let i = alert('修改成功');
          i.then((res) => {
            if (res === true) {
              setTimeout(() => {
                // 把隱藏的大頭貼區塊恢復顯示
                setAvatarFromNone('');
                // 個人資料區塊從90%設回75%
                setInformationWrap('h-75');
                // 移動到顯示個人資料
                setmoveTrain('translateY(-0%)');
              }, 200);
            }
          });
        } else {
          alert('修改失敗');
        }
      });
  }

  function deleteSelf(e) {
    // 先阻擋預設送出行為
    e.preventDefault();
    let i = confirm('確認刪除帳號?');
    i.then((res) => {
      if (res) {
        axios
          .delete('http://localhost:3000/member/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.data.success) {
              alert('刪除成功');
              logout();
            } else {
              alert('刪除失敗');
            }
          });
      } else {
        return;
      }
    });
  }
  return (
    <>
      <div
        className={`h-100 d-flex justify-content-center align-items-center ${editFromNone}`}
      >
        {/* 個人資料修改 */}
        <form
          className="w-80 text-center memberEdit"
          // 表單點擊
          onSubmit={handleSubmit}
          // 表單檢查
          onInvalid={handleInvalid}
          // 表單有更動時
          onChange={handleFormChange}
        >
          <h5>Account</h5>
          {member.google_id ? (
            <input
              type="text"
              name="account"
              value="Google User"
              disabled
              onChange={handleMaterialChange}
            />
          ) : (
            <input
              type="text"
              name="account"
              required
              value={material.account}
              onChange={handleMaterialChange}
            />
          )}
          <p>{fieldErrors.account}</p>
          <h5>User Name</h5>
          <input
            type="text"
            name="name"
            required
            value={material.name}
            onChange={handleMaterialChange}
          />
          <p>{fieldErrors.name}</p>
          <h5>Nickname</h5>
          <input
            type="text"
            name="nickname"
            value={material.nickname}
            onChange={handleMaterialChange}
          />
          <h5>Birthday</h5>
          <input
            type="date"
            name="birthday"
            value={material.birthday}
            onChange={handleMaterialChange}
          />
          <h5>Mobile</h5>
          <input
            type="namber"
            name="mobile"
            value={material.mobile}
            onChange={handleMaterialChange}
          />
          <p>{fieldErrors.mobile}</p>
          <h5>Email</h5>
          {member.google_id ? (
            <input
              type="email"
              name="email"
              required
              disabled
              value={material.email}
              onChange={handleMaterialChange}
            />
          ) : (
            <input
              type="email"
              name="email"
              required
              value={material.email}
              onChange={handleMaterialChange}
            />
          )}
          <p>{fieldErrors.email}</p>
          <h5>Address</h5>
          <textarea
            type="text"
            name="address"
            value={material.address}
            onChange={handleMaterialChange}
          />
          <div className="d-flex justify-content-around">
            <button
              onClick={(e) => {
                // 阻擋按鈕預設行為
                e.preventDefault();
                // 如未更改資料 把表單恢復成原來的值
                setMaterial(leaveForm);
                // 把隱藏的大頭貼區塊恢復顯示
                setAvatarFromNone('');
                // 個人資料區塊從90%設回75%
                setInformationWrap('h-75');
                // 移動到顯示個人資料
                setmoveTrain('translateY(-0%)');
                // 離開這個表單時把錯誤訊息清空
                setMaterialErrors(leaveFormError);
              }}
            >
              Back
            </button>
            <button onClick={deleteSelf}>Delete</button>
            <button>Confirm</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MemberEdit;
