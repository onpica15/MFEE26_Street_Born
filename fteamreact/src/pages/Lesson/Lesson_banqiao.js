import './style/Lesson_zhongxiao.scss';
import LessonTabPanel from './components/LessonTabPanel';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { alert } from '../Carts/Nathan_components/AlertComponent';
import LessonConfirmAlert from './components/LessonConfirmAlert';
const Lesson_banqiao = (props) => {
  const { setCartTotalDep } = props;
  const { auth, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginID, setLoginID] = useState(0);
  // 第一次記錄伺服器的原始資料用
  const [lessonRaw, setLessonRaw] = useState([]);
  // 呈現資料用
  const [lessonDisplay, setLessonDisplay] = useState([]);
  //呈現老師資料
  const [teacherDisplay, setTeacherDisplay] = useState([]);
  // 舞種選單
  const [danceList, setDanceList] = useState('DANCE');
  // 時間選單
  const [timeList, setTimeList] = useState('TIME');
  // 價格選單
  const [priceSortSelect, setPriceSortSelect] = useState('PRICE');

  // 舞種選項
  const danceListOption = ['Hip Hop', 'Popping', 'Locking', 'Choreography'];
  // 時間選項
  const timeListOption = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  useEffect(() => {
    if (!auth) {
      let i = alert('請登入會員');
      i.then((res) => {
        if (res === true) {
          navigate('/login');
        }
      });
    } else {
      axios
        .get('http://localhost:3000/member/memberself', {
          // 發JWT一定要加這個headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setLoginID(res.data.sid);
        });
    }
  }, []);

  const getLessonData = async () => {
    const response = await axios.get(
      `http://localhost:3000/lesson?location=板橋民生旗艦館`
    );
    // 設定到state
    setLessonRaw(response.data);

    setLessonDisplay(response.data);
  };
  useEffect(() => {
    getLessonData();
  }, []);

  const getTeacherData = async () => {
    const response = await axios.get(
      `http://localhost:3000/lesson/teacher_category?location=板橋民生旗艦館`
    );
    // 設定到state
    setTeacherDisplay(response.data);
  };

  // console.log('teacherDisplay:', teacherDisplay);

  useEffect(() => {
    getTeacherData();
  }, []);

  // 三個座標
  const center = [
    { lat: 25.041851651290155, lng: 121.55534122649684 },
    { lat: 25.031099292075666, lng: 121.46450972649664 },
    { lat: 24.155632861663089, lng: 120.65585056881044 },
  ];

  // 三個店名
  const lessonClassName = [
    'HRC 舞蹈工作室【台北忠孝館】',
    'HRC 舞蹈工作室【板橋民生旗艦館】',
    'HRC 舞蹈工作室【台中精誠館】',
  ];
  return (
    <>
      <div className=" w-100 vh-100 d-flex justify-content-end align-items-end cooler_lessoncard_background">
        <div className="work-area col-12 col-md-10 p-0">
          <div className="w-100 h-100 d-flex flex-wrap cooler_lesson_position">
            <div className=" mb-5 col-md-4 flex-wrap col-12  d-flex  justify-content-center  align-items-center">
              <div className=" lesson-card-wrap w-100 h-100">
                <div className="lesson_card shadow border w-100 h-100 d-flex flex-column  ">
                  <div className="w-100 h-30 ">
                    <img
                      className="cooler_card_img"
                      src="/imgs/lesson_imgs/l01.jpg"
                      alt=""
                    />
                  </div>
                  <div className="w-100 h-70 d-flex flex-column ">
                    <div className="w-100 h-20 d-flex flex-column justify-content-center">
                      <h4 className=" fw-bold text-center pt-2">
                        HRC舞蹈工作室
                      </h4>
                      <h5 className="fw-bold text-center">
                        【板橋民生旗艦館】
                      </h5>
                    </div>
                    <div className=" w-100 h-75 p-3 ">
                      <div className="h-25 d-flex ">
                        <div className="d-flex align-items-center w-15 h-100 coolermap d-inline-block">
                          <LessonConfirmAlert
                            center={center[1]}
                            lessonClassName={lessonClassName[1]}
                          />
                        </div>
                        <div className=" w-85 h-100 fs-6 fw-bold">
                          <p className="h-100 d-flex align-items-center">
                            新北市板橋區民生路三段248號1樓
                          </p>
                        </div>
                      </div>

                      <div className="h-75 cooler_gray">
                        <p className="card-text   ">
                          HRC舞蹈工作室提供最優質的舞蹈教學服務，每月超過三百堂多樣化課程、數十種舞蹈風格，多元的課程選擇、由淺入深的漸進式學習，讓你輕鬆踏出舞蹈的第一步，打穩基礎、深根學習、挑戰自己！
                        </p>
                        <p>
                          一起讓生活充滿節奏，用舞蹈豐富生活，加入HRC舞蹈生活館，讓生活多一件喜歡的事！
                        </p>
                        <div className=" cooler_gray d-flex align-items-center  pt-2">
                          <div className="coolerphone px-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </div>
                          <p>民生旗艦館Tel:(02)2257-8128</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-12 h-100">
              <LessonTabPanel
                // 課程畫面
                lessonRaw={lessonRaw}
                setLessonRaw={setLessonRaw}
                lessonDisplay={lessonDisplay}
                setLessonDisplay={setLessonDisplay}
                //舞種類
                danceListOption={danceListOption}
                danceList={danceList}
                setDanceList={setDanceList}
                //月份種類
                timeListOption={timeListOption}
                timeList={timeList}
                setTimeList={setTimeList}
                //價格種類
                priceSortSelect={priceSortSelect}
                setPriceSortSelect={setPriceSortSelect}
                // 會員ID
                loginID={loginID}
                // 購物車新增數字
                setCartTotalDep={setCartTotalDep}
                //老師資料
                teacherDisplay={teacherDisplay}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lesson_banqiao;
