import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../style/LessonTabPanel.scss';
import LessonCard from './Lesson_card';
import LessonSelectTime from './LessonSelectTime';
import LessonSelectDance from './LessonSelectDance';
import LessonSelectPrice from './LessonSelectPrice';
import LessonTeacher from './LessonTeacher';

import ScrollBox from '../components/ScrollBox/ScrollBox';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function LessonTabPanel(props) {
  const {
    lessonRaw,
    setLessonRaw,
    lessonDisplay,
    setLessonDisplay,
    //
    danceListOption,
    danceList,
    setDanceList,
    //
    timeListOption,
    timeList,
    setTimeList,
    //
    // priceListOption,
    priceSortSelect,
    setPriceSortSelect,
    //
    loginID,
    setCartTotalDep,
    //
    teacherDisplay,
  } = props;

  // console.log('LessonTabPanel:', { lessonDisplay });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ fontSize: '1.3rem', fontWeight: '600' }}
            label="LESSON"
            {...a11yProps(0)}
            disableRipple={true}
          />
          <Tab
            sx={{ fontSize: '1.3rem', fontWeight: '600' }}
            label="TEACHER"
            {...a11yProps(1)}
            disableRipple={true}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="w-100 h-100 d-flex cooler_lessonselect">
          <LessonSelectTime
            timeListOption={timeListOption}
            timeList={timeList}
            setTimeList={setTimeList}
          />
          <LessonSelectDance
            danceListOption={danceListOption}
            danceList={danceList}
            setDanceList={setDanceList}
          />
          <LessonSelectPrice
            priceSortSelect={priceSortSelect}
            setPriceSortSelect={setPriceSortSelect}
          />
        </div>
        <div className="w-100 h-80">
          <ScrollBox>
            <LessonCard
              lessonRaw={lessonRaw}
              setLessonRaw={setLessonRaw}
              lessonDisplay={lessonDisplay}
              setLessonDisplay={setLessonDisplay}
              //
              danceList={danceList}
              setDanceList={setDanceList}
              //
              timeList={timeList}
              setTimeList={setTimeList}
              //
              priceSortSelect={priceSortSelect}
              setPriceSortSelect={setPriceSortSelect}
              //
              loginID={loginID}
              setCartTotalDep={setCartTotalDep}
            />
          </ScrollBox>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ScrollBox>
          <div className="  w-100 h-100 d-flex flex-wrap justify-content-between">
            <LessonTeacher
              lessonDisplay={lessonDisplay}
              teacherDisplay={teacherDisplay}
            />
          </div>
        </ScrollBox>
      </TabPanel>
    </Box>
  );
}
