import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Offcanvas } from 'react-bootstrap';
import Scroll from 'react-scroll';
import './CustomChat.scss';
import AuthContext from '../../../components/AuthContext';
import axios from '../../Product/commons/axios';
import ScrollToBottom from 'react-scroll-to-bottom';

// 建立聊天連線
const socket = io.connect('http://localhost:3100');
const CustomChat = (props) => {
  const { auth, token, grade } = useContext(AuthContext);
  const {
    isChatOpen,
    setIsChatOpen,
    msgArr,
    setMsgArr,
    msgDataStore,
    setMsgDataStore,
  } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isEnterChat, setIsEnterChat] = useState(false);
  const [loginMemData, setLoginMemData] = useState({});
  const [currentMsg, setCurrentMsg] = useState('');
  const [roomID, setRoomID] = useState(0);
  const sendMsg = async () => {
    if (currentMsg !== '') {
      const msgData = {
        room: loginMemData.sid,
        author: loginMemData.mem_name,
        avatar: loginMemData.mem_avatar,
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_msg', msgData);
      axios.post('http://localhost:3000/cus_chat', msgData);
      setCurrentMsg('');
    }
  };
  const adminSendMsg = async () => {
    if (currentMsg !== '') {
      const msgData = {
        room: roomID,
        author: 'admin',
        avatar:
          'http://localhost:3000/avatar/c388d38d-a162-4910-958b-3d6ea44dff11.jpg',
        msg: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      console.log(msgData);
      await socket.emit('send_msg', msgData);
      axios.post('http://localhost:3000/cus_chat', msgData);
      setCurrentMsg('');
    }
  };
  const enterRoomHandler = (v) => {
    socket.emit('enter_chat', v.room);
    setRoomID(v.room);
    axios.get(`http://localhost:3000/cus_chat?sid=${v.room}`).then((res) => {
      setMsgArr(res.data);
    });
    setIsEnterChat(true);
  };
  const leaveRoomHandler = (v) => {
    setIsEnterChat(false);
  };
  // 判斷是否登入者為 member 還是 admin
  useEffect(() => {
    if (!auth) {
      return;
    } else {
      // 如果是一般會員
      if (grade === 'low') {
        axios
          .get('http://localhost:3000/member/memberself', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            // 進入會員專屬聊天室
            socket.emit('enter_chat', res.data.sid);
            // 保存登入中的會員資料
            setLoginMemData(res.data);
            axios
              .get(`http://localhost:3000/cus_chat?sid=${res.data.sid}`)
              .then((res) => {
                setMsgArr(res.data);
              });
          });
      } else {
        axios.get('http://localhost:3000/cus_chat/admin').then((res) => {
          console.log(res.data);
          const allChatData = res.data;
          // 取得總共幾間房間的data
          const countRoom = res.data.filter(
            (el, ind) =>
              allChatData.findIndex((obj) => obj.room === el.room) === ind
          );
          setMsgDataStore(countRoom);
        });
      }
    }
  }, [auth]);
  useEffect(() => {
    socket.on('receive_msg', (data) => {
      console.log(data);
      setMsgArr((prev) => [...prev, data]);
    });
  }, [socket]);
  return (
    <>
      {/* custom chat icon */}
      <div style={{ display: grade === 'low' ? 'block' : 'none' }}>
        <div
          style={{ transition: '.3s ease' }}
          onClick={() => {
            setIsChatOpen(!isChatOpen);
          }}
          className={
            isChatOpen
              ? 'd-none d-md-block position-fixed cus-chat-wrap-open'
              : 'd-none d-md-block position-fixed cus-chat-wrap-close'
          }
        >
          <div
            style={{
              display: isChatOpen ? 'none' : 'flex',
              opacity: isChatOpen ? '1' : '.8',
            }}
            className="w-100 h-100 cus-chat-icon justify-content-center align-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-80 w-80"
              fill="var(--main)"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div
            style={{ display: isChatOpen ? 'flex' : 'none' }}
            className="w-100 h-100 justify-content-center align-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-40 w-40"
              fill="var(--main)"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        {/* custom chat window */}
        <div
          style={{
            transition: '.3s ease',
            width: isChatOpen ? '250px' : '0px',
            height: isChatOpen ? '350px' : '0px',
          }}
          className="d-none d-md-block position-fixed cus-chat-window"
        >
          <div
            style={{ display: isChatOpen ? 'flex' : 'none' }}
            className="w-100 h-10 chat-window-title"
          >
            <span>Realtime Chat</span>
          </div>
          {/* window body */}
          <div
            style={{ display: isChatOpen ? 'flex' : 'none' }}
            className="w-100 h-80 chat-window-body"
          >
            <ScrollToBottom className="w-100 h-100 chat-body-scroll swiper-scrollbar-drag">
              <div className="w-100 h-100">
                {msgArr.map((v, i) => {
                  return (
                    <div
                      style={{
                        justifyConten: v.author !== 'admin' ? 'end' : 'start',
                        flexDirection:
                          v.author === 'admin' ? 'row' : 'row-reverse',
                      }}
                      key={i}
                      className="w-100 h-auto d-flex align-items-center flex-wrap pt-3"
                    >
                      <div className="chat-avatar">
                        <img className="w-100 h-100" src={v.avatar} alt="" />
                      </div>
                      <div className=" d-flex align-items-center">
                        <span className="px-1 fw-bold">{v.author + ' :'}</span>
                        <span>{v.msg}</span>
                      </div>
                      <span className="chat-time-text">{v.time}</span>
                    </div>
                  );
                })}
              </div>
            </ScrollToBottom>
          </div>
          <div
            style={{ display: isChatOpen ? 'flex' : 'none' }}
            className="w-100 h-10 chat-window-footer"
          >
            <div className="w-100 h-100 d-flex">
              <input
                className=" w-85 h-100"
                type="text"
                value={currentMsg}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMsg();
                  }
                }}
                onChange={(e) => {
                  setCurrentMsg(e.target.value);
                }}
              />
              <button
                onClick={sendMsg}
                className="btn w-15 h-100 focus-none send-msg-icon"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* admin chat window */}
      <div style={{ display: grade === 'low' ? 'none' : 'block' }}>
        <button
          style={{ display: auth ? 'block' : 'none' }}
          className="btn focus-none position-fixed admin-chat-btn"
          onClick={handleShow}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-100 w-100"
            viewBox="0 0 20 20"
            fill="var(--main)"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </button>

        <Offcanvas show={show} onHide={handleClose}>
          <div className="w-100 h-100 bg-darkgray">
            <div
              style={{ color: 'var(--main)' }}
              className="w-100 h-20 d-flex justify-content-center align-items-center fs-3"
            >
              Chat Management
            </div>
            <div className="w-100 h-80 position-relative chat-managenent-wrap">
              <div
                style={{ left: isEnterChat ? '-100%' : '0' }}
                className=" h-100 position-absolute d-flex chat-managenent-list"
              >
                {/* 聊天室總表 */}
                <div className="w-50 h-100 d-flex justify-content-center align-items-center">
                  <Scroll.Element className="chat-list-scroll">
                    {msgDataStore.map((v, i) => {
                      return (
                        <div
                          onClick={() => {
                            enterRoomHandler(v);
                          }}
                          style={{ cursor: 'pointer' }}
                          className="chat-room-card mb-3 d-flex flex-wrap align-items-center"
                          key={i}
                        >
                          <div className="chat-avatar">
                            <img
                              className="w-100 h-100"
                              src={v.avatar}
                              alt=""
                            />
                          </div>
                          <span>{v.author}</span>
                        </div>
                      );
                    })}
                  </Scroll.Element>
                </div>
                {/* 聊天室視窗 */}
                <div className="w-50 h-100  d-flex justify-content-center align-items-center">
                  <div
                    style={{
                      transition: '.3s ease',
                    }}
                    className="d-none d-md-flex flex-column w-80 h-70 align-items-center admin-chat-window"
                  >
                    <div className="w-97 h-10 d-flex justify-content-between align-items-center admin-window-title">
                      <span className="px-2">Admin Chat</span>
                      <button
                        style={{ transform: 'scale(1.3)' }}
                        className="btn focus-none text-white"
                        onClick={leaveRoomHandler}
                      >
                        ←
                      </button>
                    </div>
                    {/* window body */}
                    <div className="w-100 h-80 chat-window-body">
                      <ScrollToBottom className="w-98 h-100 admin-body-scroll">
                        <div className="w-100 h-100">
                          {msgArr.map((v, i) => {
                            return (
                              <div
                                style={{
                                  justifyConten:
                                    v.author !== 'admin' ? 'end' : 'start',
                                  flexDirection:
                                    v.author !== 'admin'
                                      ? 'row'
                                      : 'row-reverse',
                                }}
                                key={i}
                                className="w-100 h-auto d-flex flex-wrap align-items-center pt-3"
                              >
                                <div className="chat-avatar">
                                  <img
                                    className="w-100 h-100"
                                    src={v.avatar}
                                    alt=""
                                  />
                                </div>
                                <div className=" d-flex align-items-center text-white">
                                  <span className="px-1">
                                    {v.author + ' :'}
                                  </span>
                                  <span>{v.msg}</span>
                                </div>
                                <span className="chat-time-text">{v.time}</span>
                              </div>
                            );
                          })}
                        </div>
                      </ScrollToBottom>
                    </div>
                    <div className="w-97 h-10 admin-window-footer">
                      <div className="w-100 h-100 d-flex">
                        <input
                          style={{ borderRadius: '0 0 0 5px' }}
                          className=" w-85 h-100"
                          type="text"
                          value={currentMsg}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              adminSendMsg();
                            }
                          }}
                          onChange={(e) => {
                            setCurrentMsg(e.target.value);
                          }}
                        />
                        <button
                          onClick={adminSendMsg}
                          className="btn w-15 h-100 focus-none send-msg-icon"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="black"
                            strokeWidth={1}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas>
      </div>
    </>
  );
};

export default CustomChat;
