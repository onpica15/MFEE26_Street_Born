import '../style/LessonTeacher.scss';
import LessonVideoAlert from './LessonVideoAlert';

const LessonTeacher = (props) => {
  const { teacherDisplay } = props;
  console.log('LessonTeacher', teacherDisplay);
  const displayTable = teacherDisplay.map((v, i) => {
    return (
      <div key={v.sid} className="col-sm-4 cooler_teacher_card border">
        <div className="h-55 ">
          <div className="cooler_teacher_log h-100 d-flex">
            <div className="cooler_teacher_card_head_circle w-55 ">
              <div className="cooler_teacher_card_circle ">
                <img
                  className="cooler_teacher_card_head"
                  src={`/imgs/lesson_imgs/${v.teacher_head}`}
                  alt=""
                />
                <LessonVideoAlert teacherUrl={v.teacher_url} />
              </div>
            </div>
            <div className=" w-45 cooler_teacher_card_right ">
              <h3 className="cooler_teacher_card_teachername w-100 h-100">
                {v.teacher_name}
              </h3>
            </div>
          </div>
        </div>
        <div className="h-45 p-2 cooler_teacher_card_bottom ">
          <p className="cooler_teacher_card_info ">{v.teacher_info}</p>
        </div>
      </div>
    );
  });

  return displayTable;
};

export default LessonTeacher;
