import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import { Link } from 'react-router-dom';
const SideBar = () => {
  const { auth, grade } = useContext(AuthContext);
  const navArr = ['LESSON', 'PRODUCTS', 'CUSTOMIZED', 'ORDERS'];
  return (
    <>
      <div className="col-2 d-md-block d-none sidebar_container">
        <div className="sidebar-wrap d-flex flex-column">
          <Link to={'/'}>HOME</Link>
          {auth ? (
            <Link to={grade === 'low' ? '/member' : '/admin'}>
              {grade === 'low' ? 'MEMBER' : 'ADMIN'}
            </Link>
          ) : (
            ''
          )}
          {navArr.map((v, i) => {
            return (
              <Link key={i} to={`/${v}`}>
                {v}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;
