import React, { useState } from 'react';

const ToolBox = (props) => {
  const { filter, setFilter } = props;
  const menuItems = ['Skateboard', 'Decks', 'Trucks', 'Wheels'];
  const [menu, setMenu] = useState('Skateboard');

  return (
    <>
      <div className="toolbox d-flex justify-content-center p-0 m-0">
        <div className="col-10 d-flex justify-content-center align-items-center toolBoxRwd">
          <div className="col-4 toolBoxItemRwd">
            <ul>
              {menuItems.map((v, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      switch (i) {
                        case 0:
                          setFilter({ ...filter, categoryId: '2' });
                          setMenu(v);
                          break;
                        case 1:
                          setFilter({ ...filter, categoryId: '4' });
                          setMenu(v);
                          break;
                        case 2:
                          setFilter({ ...filter, categoryId: '5' });
                          setMenu(v);
                          break;
                        case 3:
                          setFilter({ ...filter, categoryId: '6' });
                          setMenu(v);
                          break;
                        default:
                          i = 0;
                      }
                    }}
                    className={menu === v ? 'catgory' : ''}
                  >
                    <a href="#/">{v}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </>
  );
};

export default ToolBox;
