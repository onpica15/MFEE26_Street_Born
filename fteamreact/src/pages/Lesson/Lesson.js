import './style/Lesson.css';

import LessonSwiper from './components/LessonSwiper';
import LessonPhone from './LessonPhone';

const Lesson = (props) => {
  const {setCartTotalDep} = props;
  return (
    <>
      <div className=" cooler_lesson_background w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="d-none d-sm-block h-85 w-80 work-area col-12 col-md-10 p-0">
          <LessonSwiper setCartTotalDep={setCartTotalDep}/>
        </div>
        <LessonPhone />
      </div>
    </>
  );
};

export default Lesson;
