import { useState, useEffect } from 'react';
import Loader from './Loader';

// 過場動畫使用教學將放在pages資料夾的Sample裡 2022.07.18 GaryLin

export function useSpinner(timeout = 2000) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading)
      setTimeout(() => {
        setLoading(false);
      }, timeout);
  }, [loading, timeout]);

  return {
    spinner: <Loader loading={loading} />,
    setLoading,
  };
}
