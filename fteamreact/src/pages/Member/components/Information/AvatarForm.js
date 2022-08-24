import React, { useRef, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../../../components/AuthContext';
import '../../styles/AvatarForm.scss';
import { v4 as uuidv4 } from 'uuid';
import { alert } from '../../../../components/AlertComponent';

const AvatarForm = ({ member }) => {
  // 大頭貼更換成功動畫效果
  const [avatarAnimation, setAvatarAnimation] = useState('');

  // token 發fetch用 setAuths更改狀態重新撈取會員資料
  const { token, auths, setAuths } = useContext(AuthContext);

  // 取得頭貼input
  const AvatarRef = useRef(null);

  // 點擊頭貼 觸發頭貼input
  function clickAvatar() {
    AvatarRef.current.click();
  }

  // 記錄頭貼檔案名稱
  const [material, setMaterial] = useState('');
  useEffect(() => {
    setMaterial(member.mem_avatar);
  }, [member]);

  // 頭貼input值有變換時
  async function uploadAvatar(e) {
    const data = new FormData();
    data.append('avatar', e.target.files[0]);
    const response = await axios.post(
      'http://localhost:3000/member/upload',
      data
    );
    const avatarURL = 'http://localhost:3000/avatar/' + response.data.filename;
    setMaterial(avatarURL);
  }

  // 表單點擊送出後
  async function handleSubmit(e) {
    // 先阻擋預設送出行為
    e.preventDefault();
    const response = await axios.put(
      'http://localhost:3000/member/avatar',
      { avatar: material },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success === true) {
      setAuths({ ...auths, change: uuidv4() });
      // 大頭貼執行動畫
      setAvatarAnimation('avatar 0.5s linear');
      // 再把動畫CSS清空
      setTimeout(() => {
        setAvatarAnimation('');
      }, 1000);
    } else {
      alert('頭貼修改失敗');
    }
  }
  return (
    <>
      <form
        className="h-100 memberAvatarForm"
        // 表單點擊
        onSubmit={handleSubmit}
      >
        {member === [] ? (
          ''
        ) : (
          <>
            <input
              type="file"
              name="avatar"
              ref={AvatarRef}
              onChange={uploadAvatar}
              hidden
            />
            <figure className="d-flex justify-content-center h-70">
              <img
                src={material}
                alt=""
                onClick={clickAvatar}
                // 大頭貼更換成功動畫效果
                style={{ animation: `${avatarAnimation}` }}
              />
            </figure>
            <div className="d-flex justify-content-center">
              <button className="btn">Confirm</button>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="d-xl-none scrollToBottom"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({
                  top: 667,
                  behavior: 'smooth',
                });
              }}
            >
              <path d="M256 512c141.4 0 256-114.6 256-256s-114.6-256-256-256C114.6 0 0 114.6 0 256S114.6 512 256 512zM129.2 265.9C131.7 259.9 137.5 256 144 256h64V160c0-17.67 14.33-32 32-32h32c17.67 0 32 14.33 32 32v96h64c6.469 0 12.31 3.891 14.78 9.875c2.484 5.984 1.109 12.86-3.469 17.44l-112 112c-6.248 6.248-16.38 6.248-22.62 0l-112-112C128.1 278.7 126.7 271.9 129.2 265.9z" />
            </svg>
          </>
        )}
      </form>
    </>
  );
};

export default AvatarForm;
