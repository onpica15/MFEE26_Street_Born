import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';

export default function MenuSelect() {
  const { auth, logout, grade } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(false);
  const open = anchorEl;
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navArr = ['LESSON', 'PRODUCTS', 'CUSTOMIZED', 'CARTS', 'ORDERS'];
  return (
    <div className=" d-md-none d-flex justify-content-end align-items-center w-100 h-100 menu-wrap">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={'/'}>HOME</Link>
        </MenuItem>
        {auth ? (
          <MenuItem onClick={handleClose}>
            <Link to={grade === 'low' ? '/member' : '/admin'}>
              {grade === 'low' ? 'MEMBER' : 'ADMIN'}
            </Link>
          </MenuItem>
        ) : (
          ''
        )}
        {navArr.map((v, i) => {
          return (
            <MenuItem key={i} onClick={handleClose}>
              <Link to={`/${v.toLocaleLowerCase()}`}>{v}</Link>
            </MenuItem>
          );
        })}
        {auth ? (
          <MenuItem
            onClick={() => {
              // 呼叫登出函式
              logout();
              handleClose();
            }}
          >
            SIGNOUT
          </MenuItem>
        ) : (
          <MenuItem onClick={handleClose}>
            <Link to={'/login'}>LOGIN</Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
