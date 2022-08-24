import axios from 'axios';
import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import Share_card from './cus_component/Share_card';

function Customized_explore() {

  const [cusShareData,setCusShareData]=useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3000/custom/share').then((res)=>{
     
      setCusShareData(res.data)
       
    })
  },[])



  return (



    <>
      <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area col-12 col-md-10 p-0">
          <div className="share-card-col d-flex col-12 col-mb-4 flex-wrap w-100 d-flex justify-content-center">
          {cusShareData.map((v,i)=>{
            return <Share_card key={v.sid} singleShareData={v}/>
          })}

           
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Customized_explore;
