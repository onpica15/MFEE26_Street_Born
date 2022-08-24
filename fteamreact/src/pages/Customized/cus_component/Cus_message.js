import React from 'react';
import Avatar from '@mui/material/Avatar';

function Cus_message(props) {
  const {setMessageboard}=props
  console.log(setMessageboard)

  return (
    <>
      <div class="d-flex m-2 border-bottom border-gray">
        <div class="col-2">
        
          <Avatar sx={{ bgcolor: 'black'[900] }}>OP</Avatar>
        </div>
        <div className="col-10">
          <h6>{setMessageboard.mem_name}</h6>
          <p>{setMessageboard.comment}</p>
        </div>
      </div>
    </>
  );
}

export default Cus_message;
