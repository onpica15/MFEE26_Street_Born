import '../style/LessonSelectTime.scss';

function LessonSelectTime(props) {
  const { timeListOption, timeList, setTimeList } = props;
  return (
    <div className="w-33 ">
      <select
        className="w-50 h-100 cooler_select"
        value={timeList}
        // 換選項的動作
        onChange={(e) => {
          setTimeList(e.target.value);
        }}
      >
        <option className="cooler_select" value="TIME">
          TIME
        </option>
        {timeListOption.map((v, i) => {
          return (
            <option className="cooler_select" key={i} value={v} disabled="">
              {v === '01'
                ? 'Jan'
                : v === '02'
                ? 'Feb'
                : v === '03'
                ? 'Mar'
                : v === '04'
                ? 'Apr'
                : v === '05'
                ? 'May'
                : v === '06'
                ? 'Jun'
                : v === '07'
                ? 'Jul'
                : v === '08'
                ? 'Aug'
                : v === '09'
                ? 'Sep'
                : v === '10'
                ? 'Oct'
                : v === '11'
                ? 'Nov'
                : 'Dec'}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default LessonSelectTime;
