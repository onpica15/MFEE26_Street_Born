import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Share_card from './cus_component/Share_card';
import axios from 'axios';
import AuthContext from '../../components/AuthContext';
import Prev_card from './cus_component/Prev_card';
import './Customized_collect.scss';
import { alert } from '../Carts/Nathan_components/AlertComponent';

function Customized_collect(props) {
  const { setCartTotalDep } = props;
  const [prevdata, setPrevData] = useState([]);
  const [cusShareData, setCusShareData] = useState([]);
  const { auth, token } = useContext(AuthContext);
  const [ownDep, setOwnDep] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:3000/member/memberself', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(
            `http://localhost:3000/custom/prevcusproduct?member_id=${res.data.sid}`
          )
          .then((res) => {
            console.log(res.data);
            setPrevData(res.data);
          });
      });
  }, [ownDep]);

  return (
    <>
      <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="work-area col-12 col-md-10 p-0">
          <div className="d-flex flex-column mh-100 w-100">
            <div className="create col-3 border-bottom border-gray w-100 d-flex justify-content-center aline-item-center p-5">
              <Link to={'/customized/create'}>
                <button className="viv-btn">create</button>
              </Link>
            </div>
            <div className="prev-creation col-12 col-sm-9 w-100 mh-100">
              <div className="d-sm-flex">
                <div className="col-12 col-sm-3 justify-content-center aline-item-center p-5 text-center text-sm-end ">
                  <h4>Own By You</h4>
                </div>

                <div className="col-12 col-sm-9">
                  <div className="prev-train ">
                    {prevdata.map((v, i) => {
                      return (
                        <Prev_card
                          key={v.sid}
                          prevdata={v}
                          singleShareData={v}
                          setOwnDep={setOwnDep}
                          setCartTotalDep={setCartTotalDep}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customized_collect;
