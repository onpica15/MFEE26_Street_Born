import React, { useState,useEffect,useRef } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Cus_attributes from './Cus_attributes';
import Cus_heatmap from './Cus_heatmap';
import CustBar from './CustBar';
import './Cus_tab_data.scss';
import { gsap } from 'gsap';

function TabPanel(props) {
  const { children, value, index, shareDetailData, ...other } = props;
  
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DataTabs(props) {
  const { shareDetailData,messageboard } = props;
  // console.log('shareDetailData',shareDetailData)

  const [value, setValue] = useState(0);

  const atr1Rrf=useRef();
  const atr2Rrf=useRef();
  const atr3Rrf=useRef();
  const atr4Rrf=useRef();
  const atr5Rrf=useRef();

 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    gsap.from(atr1Rrf.current, { opacity: 0,y:20,duration:1});
    gsap.from(atr2Rrf.current, { opacity: 0,y:20,delay:.5,duration:1});
    gsap.from(atr3Rrf.current, { opacity: 0,y:20,delay:1,duration:1});
    gsap.from(atr4Rrf.current, { opacity: 0,y:20,delay:1.5,duration:1});
    gsap.from(atr5Rrf.current, { opacity: 0,y:20,delay:2,duration:1});
    
  },[]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="ATTRIBUTES"
            {...a11yProps(0)}
            sx={{ width: '30%' }}
            disableRipple={true}
          />
          <Tab
            label="FEEBACKS"
            {...a11yProps(1)}
            sx={{ width: '30%' }}
            disableRipple={true}
          />
          <Tab
            label="ACTIVITIES"
            {...a11yProps(2)}
            sx={{ width: '30%' }}
            disableRipple={true}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="row detail_tab">
          <div className="attributes col-4" ref={atr1Rrf}>
            <label>style</label>
            <img
              src={`/imgs/Customized/${shareDetailData.back_style}.png`}
              className="cus-atrib-img"
            />
          </div>
          <div className="attributes col-4" ref={atr2Rrf}>
            <label>pattern</label>
            <img
              src={`/imgs/Customized/pattern/${shareDetailData.back_pattern}.png`}
              className="cus-atrib-img bg-secondary"
            />
          </div>
          <div className="attributes col-4" ref={atr3Rrf}>
            <label>base color</label>
            <div
              className="cus-atrib-img"
              style={{ backgroundColor: `${shareDetailData.back_color}` }}
            ></div>
          </div>
          <div className="attributes col-4" ref={atr4Rrf}>
            <label>sticker</label>
            <img
              src={`/imgs/Customized/sticker/${shareDetailData.back_sticker}.png`}
              className="cus-atrib-img bg-black"
            />
            
          </div>
          <div className="attributes col-4" ref={atr5Rrf}>
            <label>text</label>
            <p >{shareDetailData.back_text}</p>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustBar messageboard={messageboard}/>
      </TabPanel>
      <TabPanel value={value} index={2} >
        <Cus_heatmap className="h-100" messageboard={messageboard} />
      </TabPanel>
    </Box>
  );
}
