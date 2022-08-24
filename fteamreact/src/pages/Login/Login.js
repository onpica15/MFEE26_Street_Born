import React, { useState, useEffect } from 'react';
import './styles/Login.scss';
import LoginCariusel from './components/LoginCariusel';
import LoginMember from './components/LoginMember';
import LoginAdmin from './components/LoginAdmin';
import Register from './components/Register';
import { v4 as uuidv4 } from 'uuid';

const Login = () => {
  // 點擊後卡片翻轉
  const [loginCard, setLoginCard] = useState('');
  // 背面要呈現管理員登入還是會員註冊
  const [registerNone, setRegisterNone] = useState('d-none');
  // 文字動畫
  const [loginLogoText, setLoginLogoText] = useState('Login');
  // Logo GSAP動畫
  const [logoMove, setLogoMove] = useState(uuidv4());

  return (
    <>
      <div className="w-100 vh-100 d-flex align-items-end">
        <div className="work-area col-12 col-md-10 p-0">
          <div className="px-0 LoginBox">
            <LoginCariusel />
            <div className={`col-12 col-xl-6 h-100 LoginCard ${loginCard}`}>
              <LoginMember
                setLoginCard={setLoginCard}
                setRegisterNone={setRegisterNone}
                loginLogoText={loginLogoText}
                setLoginLogoText={setLoginLogoText}
                setLogoMove={setLogoMove}
                logoMove={logoMove}
              />
              <LoginAdmin
                setLoginCard={setLoginCard}
                loginLogoText={loginLogoText}
                setLogoMove={setLogoMove}
                logoMove={logoMove}
              />
              <Register
                registerNone={registerNone}
                setRegisterNone={setRegisterNone}
                setLoginCard={setLoginCard}
                loginLogoText={loginLogoText}
                setLoginLogoText={setLoginLogoText}
                setLogoMove={setLogoMove}
                logoMove={logoMove}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
