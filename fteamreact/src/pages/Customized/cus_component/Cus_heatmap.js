import React,{useState} from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';
import './Cus_heatmap.css';

function Cus_heatmap(props) {
  const { messageboard } = props;

  const current = new Date();
  
  const startdate=`${current.getFullYear()}-${current.getMonth()-5}-${current.getDate()}`;
  const enddate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()-1}`;

  console.log('msg', messageboard.map((v,i)=>{
    return {date:v.created_time.slice(0,10),count:1}
  }))
  

  return (
    <>

      <CalendarHeatmap 
        
        startDate={new Date(`${startdate}`)}
        endDate={new Date(`${enddate}`)}
        values={messageboard.map((v,i)=>{
          return {date:v.created_time.slice(0,10),count:1}
        })}
        // values={[ 

          
         
        //   { date: '2022-08-14', count: 1 },
        //   { date: '2022-08-14', count: 1 },
        //   { date: '2022-08-14', count: 1 },
        //   { date: '2022-08-01', count: 1 },
         
        //   // ...and so on
        // ]}
      />
    </>
  );
}

export default Cus_heatmap;
