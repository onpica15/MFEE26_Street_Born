import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './styles/Admin.scss';
import { confirm } from '../../components/ConfirmComponent';
import { alert } from '../../components/AlertComponent';
import { Link } from 'react-router-dom';
import { useSpinner } from '../../components/useSpinner/useSpinner';
import AuthContext from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  // const { spinner, setLoading } = useSpinner(1500);
  // useEffect(() => {
  //   setLoading(true);
  // }, []);

  const { grade } = useContext(AuthContext);
  const navigate = useNavigate();

  // 發fetch更新畫面用
  const [change, setChange] = useState('');
  // 接收會員的狀態 雖然沒用到但先放著
  const [allMember, setallMember] = useState([]);
  // 搜尋用
  const [searchWord, setSearchWord] = useState('');
  // 有無查看停用/啟用會員
  const [searchTrueFalse, setSearchTrueFalse] = useState('');

  useEffect(() => {
    if (grade !== 'hight') {
      alert('請先登入');
      navigate('/login');
      return;
    }
    // 拿到所有會員資料
    axios.get('http://localhost:3000/member/all').then((res) => {
      // 用該狀態先取得所有會員資料
      setallMember(res.data);
    });
  }, [change]);

  // 要呈現的資料 觸發方式:會員資料、文字搜尋、查看停用/啟用會員
  const display = useMemo(() => {
    // 如果有在搜尋 把搜尋資料塞進顯示資料的狀態裡
    if (searchWord) {
      return allMember.filter((v, i) => v.mem_name.includes(searchWord));
    }
    // 如果正在查看啟用會員的話只顯示啟用會員的資料
    if (searchTrueFalse === 'true') {
      return allMember.filter((v, i) => v.mem_bollen === 1);
    }
    // 如果正在查看停用會員的話只顯示停用會員的資料
    if (searchTrueFalse === 'false') {
      return allMember.filter((v, i) => v.mem_bollen === 0);
    }
    // 如果沒在搜尋也沒在查看停用/啟用會員 顯示全部資料
    return allMember;
  }, [allMember, searchWord, searchTrueFalse]);

  // 顯示全部會員
  function searchAllMember() {
    // 把搜尋欄清空
    setSearchWord('');
    // 把查看停用/啟用會員的狀態設回沒有在查看
    setSearchTrueFalse('');
  }

  // 顯示啟用會員
  function searchTrue() {
    // 把搜尋欄清空
    setSearchWord('');
    // 查看停用/啟用會員的狀態設成在查看啟用會員
    setSearchTrueFalse('true');
  }

  // 顯示停用會員
  function searchFalse() {
    // 把搜尋欄清空
    setSearchWord('');
    // 查看停用/啟用會員的狀態設成在查看停用會員
    setSearchTrueFalse('false');
  }

  // 管理員變動會員狀態 (停用/啟用)
  function changeState(v) {
    if (v.mem_bollen === 1) {
      let i = confirm(`確定要停用會原${v.mem_name}嗎?`);
      i.then((res) => {
        if (res) {
          // 停用
          axios
            .put('http://localhost:3000/admin/stop', { sid: v.sid })
            .then((res) => {
              if (res.data.success) {
                // 讓useEffect資料重新取得
                setChange(uuidv4());
              }
            });
        }
      });
      return;
    }
    if (v.mem_bollen === 0) {
      let i = confirm(`確定要重啟會原${v.mem_name}嗎?`);
      i.then((res) => {
        if (res) {
          // 啟用
          axios
            .put('http://localhost:3000/admin/reboot', { sid: v.sid })
            .then((res) => {
              if (res.data.success) {
                // 讓useEffect資料重新取得
                setChange(uuidv4());
              }
            });
        }
      });
    }
  }

  // 刪除會員帳號
  function deleteMember(v) {
    let i = confirm(`確定要刪除會原${v.mem_name}嗎?`);
    i.then((res) => {
      if (res) {
        axios
          .delete(`http://localhost:3000/admin/?sid=${v.sid}`)
          .then((res) => {
            if (res.data.success) {
              // 讓useEffect資料重新取得
              setChange(uuidv4());
            }
          });
      }
    });
  }

  return (
    <>
      {/* {spinner} */}
      <div className="member-bg w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area col-12 col-md-10 p-0 adminTable">
          <div className="d-flex align-items-center adminFilter">
            <div className="adminsearch">
              <input
                type="text"
                placeholder="User Name"
                className="adminsearchText"
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(e.target.value);
                }}
              />
            </div>
            <button onClick={searchAllMember}>All</button>
            <button onClick={searchTrue}>Active</button>
            <button onClick={searchFalse}>Block</button>
          </div>
          <div className="w-90 h-80">
            <table className="h-100">
              <thead>
                <tr>
                  <th className="thLeft"></th>
                  <th>ID</th>
                  <th>State</th>
                  <th>Name</th>
                  <th>Nickname</th>
                  <th>Email</th>
                  <th>Created</th>
                  <th>Saved</th>
                  <th className="thRight">Delete</th>
                </tr>
              </thead>
              <tbody>
                {display.map((v, i) => {
                  return (
                    <tr className="trHover" key={uuidv4()}>
                      <td>
                        <img
                          style={{
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            aspectRatio: '1/1',
                          }}
                          src={v.mem_avatar}
                          alt=""
                        />
                      </td>
                      <td>{v.sid}</td>
                      <td>
                        {v.mem_bollen === 1 ? 'Active ' : 'Block '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="cursorpointer w-15"
                          fill="white"
                          onClick={() => {
                            changeState(v);
                          }}
                        >
                          <path d="M464 16c-17.67 0-32 14.31-32 32v74.09C392.1 66.52 327.4 32 256 32C161.5 32 78.59 92.34 49.58 182.2c-5.438 16.81 3.797 34.88 20.61 40.28c16.89 5.5 34.88-3.812 40.3-20.59C130.9 138.5 189.4 96 256 96c50.5 0 96.26 24.55 124.4 64H336c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32V48C496 30.31 481.7 16 464 16zM441.8 289.6c-16.92-5.438-34.88 3.812-40.3 20.59C381.1 373.5 322.6 416 256 416c-50.5 0-96.25-24.55-124.4-64H176c17.67 0 32-14.31 32-32s-14.33-32-32-32h-128c-17.67 0-32 14.31-32 32v144c0 17.69 14.33 32 32 32s32-14.31 32-32v-74.09C119.9 445.5 184.6 480 255.1 480c94.45 0 177.4-60.34 206.4-150.2C467.9 313 458.6 294.1 441.8 289.6z" />
                        </svg>
                      </td>
                      <td>{v.mem_name}</td>
                      <td>{v.mem_nickname}</td>
                      <td className="emailTD">{v.mem_email}</td>
                      <td>{v.mem_created_at}</td>
                      <td>
                        <Link to={`memberfavorite/${v.sid}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="cursorpointer w-15"
                          >
                            <path
                              fill="white"
                              d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
                            />
                          </svg>
                        </Link>
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="cursorpointer w-15"
                          onClick={() => {
                            deleteMember(v);
                          }}
                        >
                          <path
                            fill="red"
                            d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
                          />
                        </svg>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
