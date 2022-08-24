import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  Bar,
  // CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from 'recharts';

function CustBar(props) {
  const { messageboard } = props;

  // console.log(messageboard);
  const [latestdate, setLatestdate] = useState('');
  const [yesterday, setYesterday] = useState('');
  const [beforyesterday, setBeforyesterday] = useState('');

  const [lastdaydata, setLastdaydata] = useState([]);
  const [yesterdaydata, setyesterdaydata] = useState([]);
  const [beforedata, setbeforedata] = useState([]);
  console.log(lastdaydata);



  //撈留言//
  useEffect(() => {
    if(messageboard.length !== 0){
      let newDateArr = messageboard[0].created_time.slice(0, 10).split('-');
      let newDate =
        newDateArr[0] + '-' + newDateArr[1] + '-' + (Number(newDateArr[2]) + 1);
      let yesterday =
        newDateArr[0] + '-' + newDateArr[1] + '-' + Number(newDateArr[2]);
  
      axios
        .get(
          `http://localhost:3000/custom/cardbardata?mes_cusproduct_id=${messageboard[0].mes_cusproduct_id}&created_time=${newDate}`
        )
        .then((res) => {
          console.log('datemsg', res.data);
          setLatestdate(newDate);
          setYesterday(yesterday);
  
          setLastdaydata(res.data);
        });

    }
   
  }, []);

  useEffect(() => {
    if(messageboard.length !== 0){
      let newDateArr = messageboard[0].created_time.slice(0, 10).split('-');
      let yesterday =
        newDateArr[0] + '-' + newDateArr[1] + '-' + Number(newDateArr[2]);
      axios
        .get(
          `http://localhost:3000/custom/cardbardata?mes_cusproduct_id=${messageboard[0].mes_cusproduct_id}&created_time=${yesterday}`
        )
        .then((res) => {
          setYesterday(yesterday);
  
          setyesterdaydata(res.data);
        });



    }
    
      
   
  }, []);

  useEffect(() => {
    if(messageboard.length !== 0){
      let newDateArr = messageboard[0].created_time.slice(0, 10).split('-');
      let beforeyesterday =
        newDateArr[0] + '-' + newDateArr[1] + '-' + (Number(newDateArr[2]) - 1);
      axios
        .get(
          `http://localhost:3000/custom/cardbardata?mes_cusproduct_id=${messageboard[0].mes_cusproduct_id}&created_time=${beforeyesterday}`
        )
        .then((res) => {
          setBeforyesterday(beforeyesterday);
  
          setbeforedata(res.data);
        });

    }
   
  }, []);

  //最近一天的留言量//
  const last5stars = lastdaydata.filter((v, i) => {
    return v.stars === '✶✶✶✶✶';
  }).length;

  const last4stars = lastdaydata.filter((v, i) => {
    return v.stars === '✶✶✶✶';
  }).length;

  const last3stars = lastdaydata.filter((v, i) => {
    return v.stars === '✶✶✶';
  }).length;
  const last2stars = lastdaydata.filter((v, i) => {
    return v.stars === '✶✶';
  }).length;
  const last1stars = lastdaydata.filter((v, i) => {
    return v.stars === '✶';
  }).length;
  // console.log('last4stars',last4stars)

  //昨天的留言量//
  const yesterday5stars = yesterdaydata.filter((v, i) => {
    return v.stars === '✶✶✶✶✶';
  }).length;

  const yesterday4stars = yesterdaydata.filter((v, i) => {
    return v.stars === '✶✶✶✶';
  }).length;

  const yesterday3stars = yesterdaydata.filter((v, i) => {
    return v.stars === '✶✶✶';
  }).length;
  const yesterday2stars = yesterdaydata.filter((v, i) => {
    return v.stars === '✶✶';
  }).length;
  const yesterday1stars = yesterdaydata.filter((v, i) => {
    return v.stars === '✶';
  }).length;

  //前天的留言量//
  const before5stars = beforedata.filter((v, i) => {
    return v.stars === '✶✶✶✶✶';
  }).length;

  const before4stars = beforedata.filter((v, i) => {
    return v.stars === '✶✶✶✶';
  }).length;

  const before3stars = beforedata.filter((v, i) => {
    return v.stars === '✶✶✶';
  }).length;
  const before2stars = beforedata.filter((v, i) => {
    return v.stars === '✶✶';
  }).length;
  const before1stars = beforedata.filter((v, i) => {
    return v.stars === '✶';
  }).length;

  

  const data = [
    {
      month: beforyesterday,
      Arm1: { val: before1stars === 0 ? 1 : before1stars, desc: 'descktop...' },
      Arm2: { val: before2stars === 0 ? 1 : before2stars, desc: 'b desc' },
      Arm3: { val: before3stars === 0 ? 1 : before3stars, desc: 'c desc' },
      Arm4: { val: before4stars === 0 ? 1 : before4stars, desc: 'd desc' },
      Arm5: { val: before5stars === 0 ? 1 : before5stars, desc: 'e desc' },
    },
    {
      month: yesterday,
      Arm1: {
        val: yesterday1stars === 0 ? 1 : yesterday1stars,
        desc: 'descktop...',
      },
      Arm2: {
        val: yesterday2stars === 0 ? 1 : yesterday2stars,
        desc: 'b desc',
      },
      Arm3: {
        val: yesterday3stars === 0 ? 1 : yesterday3stars,
        desc: 'c desc',
      },
      Arm4: {
        val: yesterday4stars === 0 ? 1 : yesterday4stars,
        desc: 'd desc',
      },
      Arm5: {
        val: yesterday5stars === 0 ? 1 : yesterday5stars,
        desc: 'e desc',
      },
    },
    {
      month: latestdate,
      Arm1: { val: last1stars === 0 ? 1 : last1stars, desc: 'descktop...' },
      Arm2: { val: last2stars === 0 ? 1 : last2stars, desc: 'b desc' },
      Arm3: { val: last3stars === 0 ? 1 : last3stars, desc: 'c desc' },
      Arm4: { val: last4stars === 0 ? 1 : last4stars, desc: 'd desc' },
      Arm5: { val: last5stars === 0 ? 1 : last5stars, desc: 'e desc' },
    },
  ];
  

  
  // console.log(messageboard[0].created_time.slice(0, 10));

  return (
    <>
      <ResponsiveContainer width="100%" height={144}>
        <BarChart
          width={600}
          height={144}
          data={data}
          stackOffset="expand"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip cursor={false} />
          <Bar
            dataKey="Arm1.val"
            stackId="1"
            stroke="#3F464C"
            fill="#3F464C"
            id="aarea"
            name="Arm1"
          />
          <Bar
            dataKey="Arm2.val"
            stackId="1"
            stroke="#4D9A98"
            fill="#4D9A98"
            id="barea"
            name="Arm2"
            cursor={'pointer'}
            onClick={(data, i) => alert('Arm2 clicked ' + i)}
          />

          <Bar
            cursor={'pointer'}
            dataKey="Arm3.val"
            stackId="1"
            stroke="#5BEAE1"
            fill="#5BEAE1"
            id="carea"
            name="Arm3"
            onClick={(data, i) => alert('Arm3 clicked ' + i)}
            // onMouseOver={() => alert()}
          />
          <Bar
            dataKey="Arm4.val"
            stackId="1"
            stroke="#8BCAF0"
            fill="#8BCAF0"
            id="barea"
            name="Arm4"
            cursor={'pointer'}
            onClick={(data, i) => alert('Arm4 clicked ' + i)}
          />
          <Bar
            dataKey="Arm5.val"
            stackId="1"
            stroke="#E3D9FF"
            fill="#E3D9FF"
            id="barea"
            name="Arm5"
            cursor={'pointer'}
            onClick={(data, i) => alert('Arm5 clicked ' + i)}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default CustBar;
