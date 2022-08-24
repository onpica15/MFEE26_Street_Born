import './style/Lesson.css';
import { Link } from 'react-router-dom';

// map彈跳視窗
import LessonConfirmAlert from './components/LessonConfirmAlert';
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

const LessonPhone = () => {
  return (
    <>
      <div className="  d-block d-sm-none  cooler_lesson_phone cooler_lesson_background w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className=" work-area col-12 col-md-10 p-0">
          <div className="cooler_lesson_background d-flex flex-wrap ">
            <div className="col-12 col-md-1 d-none d-lg-block  cooler_arrowcenter  m-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cooler_icon_wrap "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
            </div>

            <div className="col-12 card mb-5 shadowblack  ">
              <img
                src="./imgs/lesson_imgs/l01.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body ">
                <h5 className="card-title text-center fs-4 fw-bold">
                  HRC 舞蹈工作室
                </h5>
                <h6 className="card-title text-center fs-5 fw-bold">
                  【忠孝館】
                </h6>
                <div className="h-15 d-flex ">
                  <div className="w-15 coolermap d-inline-block">
                    <LessonConfirmAlert
                      center={center[0]}
                      lessonClassName={lessonClassName[0]}
                    />
                  </div>
                  <div className=" w-75 fs-6 fw-bold">
                    <p className="h-100 d-flex align-items-center">
                      國父紀念館
                    </p>
                  </div>
                </div>
                <p className=" card-text  pt-4">
                  HRC舞蹈工作室提供最優質的舞蹈教學服務，每月超過三百堂多樣化課程、數十種舞蹈風格，多元的課程選擇、由淺入深的漸進式學習，讓你輕鬆踏出舞蹈的第一步，打穩基礎、深根學習、挑戰自己！
                </p>
                <div className=" w-100 d-flex  justify-content-end">
                  <Link to={'/lesson/lesson_zhongxiao'} className="cooler-btn">
                    Go
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 card mb-5 shadowblack ">
              <img
                src="./imgs/lesson_imgs/l02.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body ">
                <h5 className="card-title text-center fs-4 fw-bold">
                  HRC 舞蹈工作室
                </h5>
                <h6 className="card-title text-center fs-5 fw-bold">
                  【板橋民生旗艦館】
                </h6>
                <div className="h-15 d-flex ">
                  <div className="w-15 coolermap d-inline-block">
                    <LessonConfirmAlert
                      center={center[1]}
                      lessonClassName={lessonClassName[1]}
                    />
                  </div>
                  <div className=" w-75 fs-6 fw-bold">
                    <p className="h-100 d-flex align-items-center">新埔站</p>
                  </div>
                </div>
                <p className="card-text  pt-4">
                  HRC舞蹈工作室提供最優質的舞蹈教學服務，每月超過三百堂多樣化課程、數十種舞蹈風格，多元的課程選擇、由淺入深的漸進式學習，讓你輕鬆踏出舞蹈的第一步，打穩基礎、深根學習、挑戰自己！
                </p>
                <div className=" w-100 d-flex  justify-content-end">
                  <Link to={'/lesson/lesson_banqiao'} className="cooler-btn">
                    Go
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 card mb-5 shadowblack ">
              <img
                src="./imgs/lesson_imgs/l03.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body ">
                <h5 className="card-title text-center fs-4 fw-bold">
                  HRC 舞蹈工作室
                </h5>
                <h6 className="card-title text-center fs-5 fw-bold">
                  【台中精誠館】
                </h6>
                <div className="h-15 d-flex ">
                  <div className="w-15 coolermap d-inline-block">
                    <LessonConfirmAlert
                      center={center[2]}
                      lessonClassName={lessonClassName[2]}
                    />
                  </div>
                  <div className=" w-75 fs-6 fw-bold">
                    <p className="h-100 d-flex align-items-center"></p>
                  </div>
                </div>
                <p className="card-text  pt-4">
                  HRC舞蹈工作室提供最優質的舞蹈教學服務，每月超過三百堂多樣化課程、數十種舞蹈風格，多元的課程選擇、由淺入深的漸進式學習，讓你輕鬆踏出舞蹈的第一步，打穩基礎、深根學習、挑戰自己！
                </p>
                <div className=" w-100 d-flex  justify-content-end">
                  <Link to={'/lesson/lesson_taichung'} className="cooler-btn">
                    Go
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-1 d-none d-lg-block cooler_arrowcenter m-3 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cooler_icon_wrap"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonPhone;
