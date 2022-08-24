import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProductTabsBoxItem1 from './ProductTabsBoxItem1';
import ProductTabsBoxItem2 from './ProductTabsBoxItem2';

const ProductTabsBox = (props) => {
  const { sid, priceData, setPriceData, setHeart, heart } = props;
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="YOU MAY ALSO LIKE" value="1" />
              <Tab
                label="PRICE HISTORY"
                value="2"
                onClick={() => {
                  setHeart(!heart);
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ProductTabsBoxItem1 />
          </TabPanel>
          <TabPanel value="2">
            <ProductTabsBoxItem2
              sid={sid}
              priceData={priceData}
              setPriceData={setPriceData}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default ProductTabsBox;
