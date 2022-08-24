import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginMember.scss';
import '../styles/Btn8.scss';
import LoginLogo from './LoginLogo';
import AuthContext from '../../../components/AuthContext';
import { alert } from '../../../components/AlertComponent';
import { v4 as uuidv4 } from 'uuid';

const LoginMember = ({
  setLoginCard,
  setRegisterNone,
  loginLogoText,
  setLoginLogoText,
  setLogoMove,
  logoMove,
}) => {
  const { auths, setAuths } = useContext(AuthContext);

  // google 登入用
  const [URL, setURL] = useState('');
  useEffect(() => {
    const handleGoogle = async () => {
      const res = await axios.get(
        'http://localhost:3000/google/api/v1/auth/google'
      );
      setURL(res.data);
    };
    handleGoogle();
  }, []);
  // 頁面導向
  const navigate = useNavigate();
  // 眼睛查看密碼
  const [memberSeePassword, setMemberSeePassword] = useState(false);
  // 記錄表單每個欄位輸入值
  const [material, setMaterial] = useState({
    account: '',
    password: '',
  });
  // onChange存值到material
  const handleMaterialChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };
  // 記錄表單每個欄位有錯誤時的訊息
  const [materialErrors, setMaterialErrors] = useState({
    account: '',
    password: '',
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
  const clickErrorText = (e) => {
    setMaterialErrors({
      ...materialErrors,
      [e.target.name]: '',
    });
  };
  // 表單點擊送出後
  async function handleSubmit(e) {
    // 先阻擋預設送出行為
    e.preventDefault();

    const response = await axios.post(
      'http://localhost:3000/member/login',
      material
    );
    // 如果登入成功
    if (response.data.success) {
      localStorage.setItem('user_info', JSON.stringify(response.data.info));
      localStorage.setItem('user_token', response.data.token);
      let i = alert('登入成功');
      i.then((res) => {
        if (res) {
          // 整個網站判斷有沒有登入
          setAuths({ ...auths, token: response.data.token, auth: true });
          // 頁面轉向
          // navigate('/', { replace: true });
          window.history.back();
        }
      });
    } else if (response.data.bollen === true) {
      alert('帳號已被停用');
    } else {
      alert('登入失敗');
    }
  }

  return (
    <>
      <div className="h-100 w-100 LoginMember LoginFront">
        <div
          className="w-100 LoginLogoRWDbox"
          onClick={() => {
            setMaterial({
              account: 'zzz',
              password: 'zzz',
            });
          }}
        >
          <LoginLogo loginLogoText={loginLogoText} logoMove={logoMove} />
        </div>
        <form
          className="w-100 text-white text-center"
          // 表單點擊
          onSubmit={handleSubmit}
          // 表單檢查
          onInvalid={handleInvalid}
          // 表單有更動時
          onChange={handleFormChange}
        >
          <h3>Account</h3>
          <input
            type="text"
            placeholder="User Account"
            name="account"
            required
            autoComplete="off"
            value={material.account}
            onChange={handleMaterialChange}
            onClick={clickErrorText}
          />
          <p>{materialErrors.account}</p>
          <h3>Password</h3>
          <input
            type={memberSeePassword ? 'text' : 'password'}
            placeholder="User Password"
            name="password"
            required
            autoComplete="off"
            value={material.password}
            onChange={handleMaterialChange}
            onClick={clickErrorText}
            className="passwordInput"
          />
          {memberSeePassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="cursorpointer seePassword"
              onClick={() => {
                setMemberSeePassword(!memberSeePassword);
              }}
            >
              <path
                fill="white"
                d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="cursorpointer seePassword"
              onClick={() => {
                setMemberSeePassword(!memberSeePassword);
              }}
            >
              <path
                fill="white"
                d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z"
              />
            </svg>
          )}
          <p>{materialErrors.password}</p>
          <div className="d-flex justify-content-center mb-4">
            <button className="custom-btn btn-8">
              <span>LOGIN</span>
            </button>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <button
              className="custom-btn btn-8"
              onClick={(e) => {
                e.preventDefault();
                setLoginCard('LoginCardRotate');
                setRegisterNone('');
                setLoginLogoText('Register');
                setLogoMove(345364634);
              }}
            >
              <span>SIGN UP</span>
            </button>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <a href={URL} className="custom-btn btn-8">
              <span>Google Login</span>
            </a>
          </div>
        </form>
        <div className="h-20 w-100 d-flex justify-content-center">
          <button
            className="buttonChangePage"
            onClick={() => {
              setLoginCard('LoginCardRotate');
              setRegisterNone('d-none');
              setLogoMove(uuidv4());
            }}
          >
            Admin
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginMember;
