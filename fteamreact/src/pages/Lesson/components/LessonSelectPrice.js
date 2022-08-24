// import { useState } from 'react';
import '../style/LessonSelectPrice.scss';

function LessonSelectPrice(props) {
  const { priceSortSelect, setPriceSortSelect } = props;

  return (
    <div className="w-33 ">
      <select
        className="h-100 cooler_select"
        value={priceSortSelect}
        // 換選項的動作
        onChange={(e) => {
          setPriceSortSelect(e.target.value);
        }}
      >
        <option className="cooler_select" value="PRICE">
          PRICE
        </option>
        <option className="cooler_select" value="Low">
          Low to High
        </option>
        <option className="cooler_select" value="High">
          High to Low
        </option>
      </select>
    </div>
  );
}

export default LessonSelectPrice;
