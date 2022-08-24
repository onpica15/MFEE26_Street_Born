import React, { useState } from 'react';
import '../../styles/Personal.scss';
import { alert } from '../../../../components/AlertComponent';

const Personal = ({
  setmoveTrain,
  setAvatarFromNone,
  setInformationWrap,
  member,
}) => {
  // 把創建時間從莫明其秒的格式轉換為常見格式
  const created = (new Date(member.mem_created_at) + '').slice(0, 24);
  // 修正註冊時非必填欄位空字串問題
  const notyet = {
    nickname: member.mem_nickname,
    mobile: member.mem_mobile,
  };
  if (notyet.nickname === '') {
    notyet.nickname = 'Not yet Available';
  }
  if (notyet.mobile === '') {
    notyet.mobile = 'Not yet Available';
  }
  return (
    <>
      <div className="h-100 d-flex justify-content-center text-center pt-3">
        <div className="w-80 personal">
          {/* 簡易個人資料 */}
          <h5>USER NAME</h5>
          <p>{member.mem_name}</p>
          <h5>NICKNAME</h5>
          <p>{notyet.nickname}</p>
          <h5>EMAIL</h5>
          <p>{member.mem_email}</p>
          <h5>JOIN TIME</h5>
          <p>{created}</p>
          <h5>Mobile</h5>
          <p>{notyet.mobile}</p>
          <div className="d-flex justify-content-around">
            <button
              onClick={(e) => {
                // 阻擋按鈕預設行為
                e.preventDefault();
                // 隱藏大頭貼區塊
                setAvatarFromNone('d-none');
                // 資料區塊高度設為90%
                setInformationWrap('h-90');
                // 移動到編輯個人資料
                setmoveTrain('translateY(-100%)');
              }}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                // 阻擋按鈕預設行為
                e.preventDefault();
                if (member.google_id) {
                  alert('Google用戶無法修改密碼');
                  return;
                }
                // 移動到修改密碼
                setmoveTrain('translateY(-200%)');
              }}
            >
              Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Personal;
