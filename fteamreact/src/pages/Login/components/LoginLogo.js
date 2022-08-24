import React, { useEffect, useRef } from 'react';
// 文字動畫
import Texty from 'rc-texty';
import 'rc-texty/assets/index.css';
import '../styles/LoginLogo.scss';
import { gsap } from 'gsap';

const LoginLogo = ({ loginLogoText, logoMove }) => {
  console.log(logoMove);
  const loginLogoRef = useRef(null);
  useEffect(() => {
    gsap.from(loginLogoRef.current, {
      opacity: 0,
      y: -150,
      duration: 0.5,
      // ease: 'expo',
      ease: 'bounce',
    });
  }, [logoMove]);
  return (
    <>
      <div
        className="LoginLogoBox text-center d-flex justify-content-center align-items-center"
        ref={loginLogoRef}
      >
        <h2>{loginLogoText}</h2>
      </div>
    </>
  );
};

export default LoginLogo;
