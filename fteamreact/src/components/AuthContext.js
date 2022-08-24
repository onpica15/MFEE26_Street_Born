import React from 'react';

const AuthContext = React.createContext({
  auth: false,
  token: '',
  // 為了即時刷新網站會員個人資料的
  change: '',
});

export default AuthContext;
