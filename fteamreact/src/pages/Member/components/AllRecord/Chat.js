import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  Fragment,
  useMemo,
} from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from '../../../../components/AuthContext';
import { MemberContext } from '../../../../App';
import '../../styles/Chat.scss';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const Chat = ({ selectItem }) => {
  // 拿到token 存資料用
  const { token } = useContext(AuthContext);
  // 拿到使用者資訊
  const { member } = useContext(MemberContext);
  // 有暱稱顯示暱稱 沒暱稱顯示姓名
  let chatName = member.mem_nickname;
  if (member.mem_nickname === '') {
    chatName = member.mem_name;
  }
  // 設置message
  const [messageState, setMessageState] = useState({
    message: '',
  });
  // socket.io即時聊天用的
  const [chat, setChat] = useState([]);
  // 從資料庫拿出過往聊天紀錄渲染用的
  const [chatAll, setChatAll] = useState([]);

  // 取得照片input
  const imgInput = useRef(null);

  // 模擬點擊上傳照片
  function clickImginput() {
    imgInput.current.click();
  }

  // 連接socket用
  const socketRef = useRef(null);

  // 讓聊天室scrollbar置底
  const scrollDown = useRef(null);

  // 聊天室scrollbar置底涵式
  const scrollToBottom = () => {
    // 計算現在聊天室的高度
    const scrollHeight = scrollDown.current.scrollHeight;
    // 置底 smooth有動畫效果
    scrollDown.current.scrollTo({
      top: scrollHeight,
      behavior: 'smooth',
    });
  };

  // 到聊天室頁面的時候訊息瞬間置底
  useEffect(() => {
    if (selectItem === 'CHAT') {
      const scrollHeight = scrollDown.current.scrollHeight;
      scrollDown.current.scrollTo({
        top: scrollHeight,
        behavior: 'instant',
      });
    }
  }, [selectItem]);

  // 拿到所有過去聊天紀錄 deps放member是想要即時刷新個人資料
  useEffect(() => {
    // 拿到所有過去聊天紀錄
    axios.get('http://localhost:3000/member/chat').then((res) => {
      setChatAll(res.data);
    });
    // 把即時聊天清空 讓聊天室不會有重複訊息
    setChat([]);
    // 訊息重新置底
    scrollToBottom();
  }, [member]);

  // 聊天訊息連接socket
  useEffect(() => {
    // 與聊天室Sever的連接
    socketRef.current = io.connect('http://localhost:4000');
    socketRef.current.on(
      'message',
      ({ name, message, sid, avatar, chatimg }) => {
        setChat([...chat, { name, message, sid, avatar, chatimg }]);
      }
    );
    // 過0.05毫秒置底
    setTimeout(() => {
      scrollToBottom();
    }, 50);
    return () => socketRef.current.disconnect();
  }, [chat]);

  // 紀錄訊息欄位的值
  const onTextChange = (e) => {
    setMessageState({ [e.target.name]: e.target.value });
  };

  //點擊表單提交時
  const onMessageSubmit = (e) => {
    // 阻擋表單送出預設行為
    e.preventDefault();
    const { message } = messageState;
    // 如果沒有訊息就中斷
    if (!message) {
      return;
    }
    // 把訊息存進資料庫
    axios
      .post(
        'http://localhost:3000/member/chat',
        {
          message: message,
        },
        {
          // 發JWT一定要加這個headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
      });
    // 要在後端(message 自己設置的)那邊傳入{ name, message, sid, avatar }
    socketRef.current.emit('message', {
      name: chatName,
      message,
      sid: member.sid,
      avatar: member.mem_avatar,
      chatimg: '',
    });

    // 清空聊天訊息
    setMessageState({ message: '' });
  };

  // 聊天室照片input值有變換時
  async function uploadImg(e) {
    if (!e.target.files[0]) {
      return;
    }
    const data = new FormData();
    data.append('chatimg', e.target.files[0]);
    // 把照片存到後端資料夾
    await axios
      .post('http://localhost:3000/member/chatupload', data)
      .then((res) => {
        // 把照片檔名當訊息存進聊天室資料庫
        axios.post(
          'http://localhost:3000/member/chat',
          {
            message: res.data.filename,
          },
          {
            // 發JWT一定要加這個headers
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 要在後端(message 自己設置的)那邊傳入{ name, message, sid, avatar, chatimg }
        socketRef.current.emit('message', {
          name: chatName,
          sid: member.sid,
          avatar: member.mem_avatar,
          chatimg: res.data.filename,
          message: '',
        });

        // 聊天訊息的input value清空
        setMessageState({
          message: '',
        });
      });
  }

  // 開關emoji盒子
  const [emojiBox, setEmojiBox] = useState(false);
  // 傳入emoji訊息
  const emojiClick = (e) => {
    let { message } = messageState;
    setMessageState({ message: (message += e.native) });
  };

  useEffect(() => {
    function emojiClick() {
      setEmojiBox(false);
    }
    document.querySelector('body').addEventListener('click', emojiClick);
    return () => {
      document.querySelector('body').removeEventListener('click', emojiClick);
    };
  }, []);

  // 判斷對話中有沒有含http 有的話包成連結 沒有的話直接顯示
  // {[message].filter((v, i) => v.includes('http')).length !== 0 ? (
  //   <a href={[message].filter((v, i) => v.includes('http'))}>
  //     {[message].filter((v, i) => v.includes('http'))}
  //   </a>
  // ) : (
  //   message
  // )}

  //  *! 聊天室多重三元運算子判斷 GaryLin 2022.08.02
  //  *! 1.先判斷該訊息是否為使用者自己發的(會員sid)
  //  *! 2.再判斷該訊息是否為圖片檔名(jpg/png/gif)
  //  *! 3.最後判斷該訊息是否為連結(http)
  //  *! 4.上面都判斷完後才輸出成一般訊息

  // socket.io渲染聊天室
  const renderChat = () => {
    return chat.map(({ name, message, sid, avatar, chatimg }) => (
      <Fragment key={uuidv4()}>
        {/* 判斷對話是不是使用者本人 */}
        {member.sid !== sid ? (
          <>
            {[chatimg].filter((v, i) => v.includes('jpg' | 'png' | 'gif'))
              .length !== 0 ? (
              <div className="d-flex align-items-center pt-2 pb-2">
                <img className="avatar" src={avatar} alt="" />
                <h3 style={{ marginLeft: '1%' }}>
                  {name}
                  <span> : </span>
                </h3>
                <img
                  className="chatimgOtherMember"
                  src={`http://localhost:3000/chatimg/${chatimg}`}
                  alt=""
                />
              </div>
            ) : (
              <div className="d-flex align-items-center pt-2 pb-2">
                <img className="avatar" src={avatar} alt="" />
                <h3 style={{ marginLeft: '1%' }}>
                  {name}
                  <span>
                    {' '}
                    :{' '}
                    {[message].filter((v, i) => v.includes('http')).length !==
                    0 ? (
                      <a href={[message].filter((v, i) => v.includes('http'))}>
                        {[message].filter((v, i) => v.includes('http'))}
                      </a>
                    ) : (
                      message
                    )}
                  </span>
                </h3>
              </div>
            )}
          </>
        ) : (
          <>
            {[chatimg].filter((v, i) => v.includes('jpg' | 'png' | 'gif'))
              .length !== 0 ? (
              <div className="d-flex justify-content-end align-items-center pt-2 pb-2 flex-wrap">
                <img
                  className="chatimg"
                  src={`http://localhost:3000/chatimg/${chatimg}`}
                  alt=""
                />
                <h3 style={{ marginRight: '1%' }}>
                  <span style={{ marginRight: '5px' }}> :</span>
                </h3>
                <img className="avatar" src={avatar} alt="" />
              </div>
            ) : (
              <div className="d-flex justify-content-end align-items-center pt-2 pb-2">
                <h3 style={{ marginRight: '1%' }}>
                  <span style={{ marginRight: '5px' }}>
                    {[message].filter((v, i) => v.includes('http')).length !==
                    0 ? (
                      <a href={[message].filter((v, i) => v.includes('http'))}>
                        {[message].filter((v, i) => v.includes('http'))}
                      </a>
                    ) : (
                      message
                    )}{' '}
                    :
                  </span>
                </h3>
                <img className="avatar" src={avatar} alt="" />
              </div>
            )}
          </>
        )}
      </Fragment>
    ));
  };

  return (
    <div className="h-100 d-flex justify-content-center">
      <div className="memberChat">
        <div className="h-90 chatScroll" ref={scrollDown}>
          {/* 過往聊天紀錄 */}
          {chatAll.map((v, i) => {
            return (
              <Fragment key={uuidv4()}>
                {/* 判斷對話是不是使用者本人 */}
                {v.mem_sid !== member.sid ? (
                  <>
                    {[v.message].filter((v, i) =>
                      v.includes('jpg' | 'png' | 'gif')
                    ).length !== 0 ? (
                      <div className="d-flex align-items-center pt-2 pb-2">
                        <img className="avatar" src={v.mem_avatar} alt="" />
                        <h3 style={{ marginLeft: '1%' }}>
                          {v.mem_nickname ? v.mem_nickname : v.mem_name}
                          <span> : </span>
                        </h3>
                        <img
                          className="chatimgOtherMember"
                          src={`http://localhost:3000/chatimg/${v.message}`}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="d-flex align-items-center pt-2 pb-2">
                        <img className="avatar" src={v.mem_avatar} alt="" />
                        <h3 style={{ marginLeft: '1%' }}>
                          {v.mem_nickname ? v.mem_nickname : v.mem_name}
                          <span>
                            {' '}
                            :{' '}
                            {[v.message].filter((v, i) => v.includes('http'))
                              .length !== 0 ? (
                              <a
                                href={[v.message].filter((v, i) =>
                                  v.includes('http')
                                )}
                              >
                                {[v.message].filter((v, i) =>
                                  v.includes('http')
                                )}
                              </a>
                            ) : (
                              v.message
                            )}
                          </span>
                        </h3>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {[v.message].filter((v, i) =>
                      v.includes('jpg' | 'png' | 'gif')
                    ).length !== 0 ? (
                      <div className="d-flex justify-content-end align-items-center pt-2 pb-2 flex-wrap">
                        <img
                          className="chatimg"
                          src={`http://localhost:3000/chatimg/${v.message}`}
                          alt=""
                        />
                        <h3 style={{ marginRight: '1%' }}>
                          <span style={{ marginRight: '5px' }}> :</span>
                        </h3>
                        <img className="avatar" src={v.mem_avatar} alt="" />
                      </div>
                    ) : (
                      <div className="d-flex justify-content-end align-items-center pt-2 pb-2">
                        <h3 style={{ marginRight: '1%' }}>
                          <span style={{ marginRight: '5px' }}>
                            {[v.message].filter((v, i) => v.includes('http'))
                              .length !== 0 ? (
                              <a
                                href={[v.message].filter((v, i) =>
                                  v.includes('http')
                                )}
                              >
                                {[v.message].filter((v, i) =>
                                  v.includes('http')
                                )}
                              </a>
                            ) : (
                              v.message
                            )}{' '}
                            :
                          </span>
                        </h3>
                        <img className="avatar" src={v.mem_avatar} alt="" />
                      </div>
                    )}
                  </>
                )}
              </Fragment>
            );
          })}
          {/* socket.io的即時渲染 */}
          {renderChat()}
        </div>
        <form
          onSubmit={onMessageSubmit}
          className="w-100 d-flex justify-content-center align-items-center"
        >
          <input
            name="message"
            onChange={onTextChange}
            value={messageState.message}
            placeholder="Say something"
          />
          <input
            type="file"
            name="img"
            ref={imgInput}
            onChange={uploadImg}
            hidden
          />
          <button>Send</button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="cursorpointer"
            onClick={clickImginput}
          >
            <path d="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="cursorpointer"
            onClick={(e) => {
              e.stopPropagation();
              setEmojiBox(!emojiBox);
            }}
          >
            <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256.3 331.8C208.9 331.8 164.1 324.9 124.5 312.8C112.2 309 100.2 319.7 105.2 331.5C130.1 390.6 188.4 432 256.3 432C324.2 432 382.4 390.6 407.4 331.5C412.4 319.7 400.4 309 388.1 312.8C348.4 324.9 303.7 331.8 256.3 331.8H256.3zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z" />
          </svg>
        </form>
        {/* {emojiBox ? (
          <div className="emojiBox">
            <Picker onEmojiSelect={emojiClick} />
          </div>
        ) : (
          ''
        )} */}
        <div
          className={emojiBox ? 'emojiBox' : 'd-none'}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Picker emojiSize={24} onEmojiSelect={emojiClick} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
