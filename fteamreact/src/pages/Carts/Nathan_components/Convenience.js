import { useContext, useEffect, useState } from 'react';
import Taipei from './data/711/台北市.json';
import Newtaipei from './data/711/新北市.json';
import Taichung from './data/711/台中市.json';
import Keelung from './data/711/基隆市.json';
import Taitung from './data/711/台東縣.json';
import Tainan from './data/711/台南市.json';
import Yilan from './data/711/宜蘭縣.json';
import Hualien from './data/711/花蓮縣.json';
import Kinmen from './data/711/金門縣.json';
import Nantou from './data/711/南投縣.json';
import Pingtung from './data/711/屏東縣.json';
import Miaoli from './data/711/苗栗縣.json';
import Taoyuan from './data/711/桃園市.json';
import Kaohsiung from './data/711/高雄市.json';
import Lienchiang from './data/711/連江縣.json';
import Yunlin from './data/711/雲林縣.json';
import Hsinchu from './data/711/新竹市.json';
import Chiayi from './data/711/嘉義市.json';
import Changhua from './data/711/彰化縣.json';
import Penghu from './data/711/澎湖縣.json';
import MyMap from './MyMap';
import axios from 'axios';
import AuthContext from '../../../components/AuthContext';

function Convenience(props) {
  // group by key function
  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

  const { toConvenceFrom, setToConvenceFrom, formErrorMsg, setFormErrorMsg } =
    props;
  const { token } = useContext(AuthContext);
  const [convenceCountryInd, setConvenceCountryInd] = useState(-1);
  const [convenceTownsShipInd, setConvenceTownsShipInd] = useState(-1);
  const [convenceStoreInd, setConvenceStoreInd] = useState(-1);
  const [isDisable, setIsDisable] = useState(true);
  let Convence = [
    JSON.parse(JSON.stringify(Taipei)),
    JSON.parse(JSON.stringify(Newtaipei)),
    JSON.parse(JSON.stringify(Taichung)),
    JSON.parse(JSON.stringify(Keelung)),
    JSON.parse(JSON.stringify(Yilan)),
    JSON.parse(JSON.stringify(Taitung)),
    JSON.parse(JSON.stringify(Tainan)),
    JSON.parse(JSON.stringify(Hualien)),
    JSON.parse(JSON.stringify(Kinmen)),
    JSON.parse(JSON.stringify(Nantou)),
    JSON.parse(JSON.stringify(Pingtung)),
    JSON.parse(JSON.stringify(Miaoli)),
    JSON.parse(JSON.stringify(Taoyuan)),
    JSON.parse(JSON.stringify(Kaohsiung)),
    JSON.parse(JSON.stringify(Lienchiang)),
    JSON.parse(JSON.stringify(Yunlin)),
    JSON.parse(JSON.stringify(Hsinchu)),
    JSON.parse(JSON.stringify(Chiayi)),
    JSON.parse(JSON.stringify(Changhua)),
    JSON.parse(JSON.stringify(Penghu)),
  ];
  // 新增區域
  for (let obj of Convence) {
    for (let storeObj of obj.stores) {
      storeObj.townsShip = storeObj.Address.slice(3, 6);
    }
  }
  for (let i = 0; i < Convence.length; i++) {
    Convence[i].stores = groupBy(Convence[i].stores, 'townsShip');
  }
  // console.log('Convence', Convence);
  let storeArr = [];
  for (let i = 0; i < Convence.length; i++) {
    storeArr.push(Convence[i].stores);
  }
  // console.log('storeArr : ', storeArr);
  const rows = Convence.map((v, i) => {
    return {
      [v.city_name]: v.stores,
    };
  });
  // console.log('rows', rows);
  // 取得縣市的陣列
  let countryArr = [];
  rows.map((v, i) => {
    let [countryName] = Object.keys(v);
    countryArr.push(countryName);
  });
  // console.log('countryArr :', countryArr);

  // 取得區域的陣列
  let townshipArr = [];
  rows.map((v, i, array) => {
    let [countryName] = Object.keys(v);
    let townshipName = Object.keys(v[countryName]);
    townshipArr.push(townshipName);
  });
  // console.log('townshipArr', townshipArr);
  const clearConvenceFormHandler = () => {
    setToConvenceFrom({
      fullName: '',
      mobile: '',
      email: '',
      convenceCountry: '',
      convenceTownship: '',
      convenceStore: '',
    });
    setConvenceCountryInd(-1);
    setConvenceTownsShipInd(-1);
    setConvenceStoreInd(-1);
  };

  const toConvenceFromHandler = (e) => {
    setToConvenceFrom({ ...toConvenceFrom, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-100 h-100">
      <div className="w-100 h-30 store-selectors-wrap">
        <div className="w-100 h-33 d-flex">
          <div className=" position-relative">
            <input
              className=" w-100 text-gray bg-transparent checkout-input"
              name="fullName"
              value={toConvenceFrom.fullName}
              type="text"
              placeholder="* Name :"
              onChange={toConvenceFromHandler}
              autoComplete="off"
            />
            <span
              style={{
                fontSize: '12px',
                right: '0px',
                bottom: '30%',
                color: 'red',
              }}
              className="position-absolute"
            >
              {formErrorMsg.nameMsg !== '' ? '* 姓名最少兩個字' : ''}
            </span>
          </div>
          <div className="relative">
            <input
              className=" w-100 focus-none text-gray bg-transparent checkout-input"
              name="mobile"
              pattern="09\d{2}(\d{6}|-\d{3}-\d{3})"
              value={toConvenceFrom.mobile}
              type="text"
              placeholder="* Mobile :"
              onChange={toConvenceFromHandler}
              autoComplete="off"
            />
            <span
              style={{
                fontSize: '12px',
                right: '-15px',
                bottom: '30%',
                color: 'red',
              }}
              className="position-absolute"
            >
              {formErrorMsg.mobileMsg !== '' ? '* 手機格式不符' : ''}
            </span>
          </div>
        </div>
        <div className="w-100 h-33 d-flex align-items-center">
          <div className="w-100 h-100 relative">
            <input
              className=" w-100 focus-none text-gray bg-transparent checkout-input"
              name="email"
              value={toConvenceFrom.email}
              type="text"
              placeholder="* Email :"
              onChange={toConvenceFromHandler}
              autoComplete="off"
            />
            <span
              style={{
                fontSize: '12px',
                right: '-15px',
                bottom: '30%',
                color: 'red',
              }}
              className="absolute"
            >
              {formErrorMsg.emailMsg !== '' ? '* Email格式不符' : ''}
            </span>
          </div>
        </div>
        <div className="w-100 h-33 d-flex justify-content-between">
          <select
            disabled={toConvenceFrom.convenceStore !== '' ? true : false}
            className="w-30 bg-transparent text-gray border-0 focus-none"
            value={convenceCountryInd}
            onChange={(e) => {
              setConvenceCountryInd(Number(e.target.value));
              setToConvenceFrom({
                ...toConvenceFrom,
                convenceCountry: countryArr[e.target.value],
              });
              setConvenceTownsShipInd(-1);
            }}
          >
            <option className="text-black" disabled value="-1">
              選擇縣市
            </option>
            {countryArr.map((v, i) => {
              return (
                <option className="text-black" key={i} value={i}>
                  {v}
                </option>
              );
            })}
          </select>
          <select
            disabled={toConvenceFrom.convenceStore !== '' ? true : false}
            value={convenceTownsShipInd}
            className="w-30 bg-transparent text-gray border-0 focus-none"
            onChange={(e) => {
              setConvenceTownsShipInd(Number(e.target.value));
              setToConvenceFrom({
                ...toConvenceFrom,
                convenceTownship:
                  townshipArr[convenceCountryInd][e.target.value],
              });
            }}
          >
            <option className="text-black" disabled value="-1">
              選擇區域
            </option>
            {convenceCountryInd > -1 &&
              townshipArr[convenceCountryInd].map((v, i) => {
                return (
                  <option className="text-black" key={i} value={i}>
                    {v}
                  </option>
                );
              })}
          </select>
          <select
            disabled={!isDisable}
            defaultValue={-1}
            className="w-30 bg-transparent text-gray border-0 focus-none"
            onChange={(e) => {
              setToConvenceFrom({
                ...toConvenceFrom,
                convenceStore: e.target.value,
              });
            }}
          >
            <option className="text-black" disabled value={-1}>
              選擇門市
            </option>
            {convenceTownsShipInd > -1
              ? storeArr[convenceCountryInd][
                toConvenceFrom.convenceTownship
              ].map((v, i) => {
                return (
                  <option
                    className="text-black"
                    key={i}
                    value={v.POIName + '門市'}
                  >
                    {v.POIName + '門市'}
                  </option>
                );
              })
              : null}
          </select>
        </div>
      </div>
      <div className="w-100 h-70">
        <div className="w-100 h-15 d-flex justify-content-end">
          <button
            style={{ backgroundColor: !isDisable && '#4091a7' }}
            disabled={!isDisable}
            onClick={isDisable ? clearConvenceFormHandler : null}
            className="focus-none clear-store"
          >
            Clear
          </button>
        </div>
        <div className="w-100 h-85">
          <MyMap
            storeArr={storeArr}
            convenceCountryInd={convenceCountryInd}
            toConvenceFrom={toConvenceFrom}
            setToConvenceFrom={setToConvenceFrom}
            isDisable={isDisable}
            setIsDisable={setIsDisable}
          />
        </div>
      </div>
    </div>
  );
}

export default Convenience;
