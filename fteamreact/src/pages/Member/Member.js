import React, { useEffect, useRef, useContext } from 'react';
import { useSpinner } from '../../components/useSpinner/useSpinner';
import Information from './components/Information/Information';
import AllRecord from './components/AllRecord/AllRecord';
import './styles/Member.scss';
import { gsap } from 'gsap';
import axios from 'axios';
import AuthContext from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { alert } from '../../components/AlertComponent';

const Member = ({ setCartTotalDep }) => {
  // 過場動畫
  // const { spinner, setLoading } = useSpinner(4000);
  // useEffect(() => {
  //   setLoading(true);
  // }, []);

  const { auth, token, logout, auths, grade, setAuths } =
    useContext(AuthContext);

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');

  const navigate = useNavigate();

  const getGoogleUser = () => {
    axios
      .get(`http://localhost:3000/google/googleLogin?id=${id}`)
      .then((res) => {
        if (res) {
          console.log(123213, res.data);
          if (res.data.info === undefined && res.data.token === undefined) {
            alert('請先登入會員');
            navigate('/login');
            return;
          }
          localStorage.setItem('user_info', JSON.stringify(res.data.info));
          localStorage.setItem('user_token', res.data.token);
          // 整個網站判斷有沒有登入
          setAuths({ ...auths, token: res.data.token, auth: true });
        }
      });
  };

  useEffect(() => {
    if (auth) {
      return;
    }
    getGoogleUser();
  }, []);

  const allRecordRef = useRef(null);
  const information = useRef(null);
  useEffect(() => {
    gsap.from(allRecordRef.current, {
      opacity: 0,
      x: -250,
      duration: 1,
      // ease: 'expo',
      ease: 'circ',
    });
    gsap.from(information.current, {
      opacity: 0,
      x: -250,
      duration: 2,
      // ease: 'expo',
      ease: 'circ',
    });
  }, []);
  return (
    <>
      {/* {spinner} */}
      <div className="member-bg w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area col-12 col-md-10 p-0 d-flex flex-wrap">
          <div className="col-12 col-xl-4 h-100" ref={information}>
            {/* 左邊 大頭貼 個人資料修改等等 */}
            <Information />
          </div>
          <div className="col-12 col-xl-8 h-100" ref={allRecordRef}>
            <AllRecord setCartTotalDep={setCartTotalDep} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Member;
