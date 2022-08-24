import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const MuiTabs = ({ selectItem, setSelectItem }) => {
  const handleChange = (event, newValue) => {
    setSelectItem(newValue);
  };
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'black' }}>
          <Tabs
            aria-label="basic tabs example"
            value={selectItem}
            onChange={handleChange}
          >
            <Tab
              sx={{ fontSize: '0.7rem' }}
              disableRipple={true}
              label="SAVED"
              value={'SAVED'}
            />
            <Tab
              sx={{ fontSize: '0.7rem' }}
              disableRipple={true}
              label="PURCHASED"
              value={'PURCHASED'}
            />
            <Tab
              sx={{ fontSize: '0.7rem' }}
              disableRipple={true}
              label="LESSONS"
              value={'LESSONS'}
            />
            <Tab
              sx={{ fontSize: '0.7rem' }}
              disableRipple={true}
              label="CHAT"
              value={'CHAT'}
            />
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default MuiTabs;
