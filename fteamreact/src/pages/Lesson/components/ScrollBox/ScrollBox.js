import React from 'react';
import './ScrollBox.scss';

const ScrollBox = ({ children }) => {
  return (
    <>
      <div className="w-100 h-100 cooler_ScrollBox">{children}</div>
    </>
  );
};

export default ScrollBox;
