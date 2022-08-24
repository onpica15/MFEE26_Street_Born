import React from 'react';
import {
  GoogleMap,
  LoadScript,
  useLoadScript,
  Marker,
  InfoWindow,
  InfoBox,
} from '@react-google-maps/api';
import './MyMap.scss';
import { confirm } from './ConfirmComponent';
import { alert } from './AlertComponent';
function MyMap(props) {
  const {
    toConvenceFrom,
    setToConvenceFrom,
    convenceCountryInd,
    storeArr,
    setIsDisable,
  } = props;
  const center =
    toConvenceFrom.convenceStore !== ''
      ? {
        lat: storeArr[convenceCountryInd][
          toConvenceFrom.convenceTownship
        ].filter(
          (v, i) => v['POIName'] === toConvenceFrom.convenceStore.slice(0, 2)
        )[0]['Y'],
        lng: storeArr[convenceCountryInd][
          toConvenceFrom.convenceTownship
        ].filter(
          (v, i) => v['POIName'] === toConvenceFrom.convenceStore.slice(0, 2)
        )[0]['X'],
      }
      : toConvenceFrom.convenceCountry === '台北市'
        ? { lat: 25.09108, lng: 121.5598 }
        : toConvenceFrom.convenceCountry === '新北市'
          ? { lat: 24.91571, lng: 121.6739 }
          : toConvenceFrom.convenceCountry === '南投縣'
            ? { lat: 23.83876, lng: 120.9876 }
            : toConvenceFrom.convenceCountry === '台中市'
              ? { lat: 24.23321, lng: 120.9417 }
              : toConvenceFrom.convenceCountry === '台南市'
                ? { lat: 23.1417, lng: 120.2513 }
                : toConvenceFrom.convenceCountry === '台東縣'
                  ? { lat: 22.98461, lng: 120.9876 }
                  : toConvenceFrom.convenceCountry === '嘉義市'
                    ? { lat: 23.47545, lng: 120.4473 }
                    : toConvenceFrom.convenceCountry === '嘉義縣'
                      ? { lat: 23.45889, lng: 120.574 }
                      : toConvenceFrom.convenceCountry === '基隆市'
                        ? { lat: 25.10898, lng: 121.7081 }
                        : toConvenceFrom.convenceCountry === '宜蘭縣'
                          ? { lat: 24.69295, lng: 121.7195 }
                          : toConvenceFrom.convenceCountry === '屏東縣'
                            ? { lat: 22.54951, lng: 120.62 }
                            : toConvenceFrom.convenceCountry === '彰化縣'
                              ? { lat: 23.99297, lng: 120.4818 }
                              : toConvenceFrom.convenceCountry === '新竹市'
                                ? { lat: 24.80395, lng: 120.9647 }
                                : toConvenceFrom.convenceCountry === '新竹縣'
                                  ? { lat: 24.70328, lng: 121.1252 }
                                  : toConvenceFrom.convenceCountry === '桃園市'
                                    ? { lat: 24.993777, lng: 121.301337 }
                                    : toConvenceFrom.convenceCountry === '澎湖縣'
                                      ? { lat: 23.56548, lng: 119.6151 }
                                      : toConvenceFrom.convenceCountry === '花蓮縣'
                                        ? { lat: 23.7569, lng: 121.3542 }
                                        : toConvenceFrom.convenceCountry === '苗栗縣'
                                          ? { lat: 24.48927, lng: 120.9417 }
                                          : toConvenceFrom.convenceCountry === '連江縣'
                                            ? { lat: 26.19737, lng: 119.5397 }
                                            : toConvenceFrom.convenceCountry === '金門縣'
                                              ? { lat: 24.43679, lng: 118.3186 }
                                              : toConvenceFrom.convenceCountry === '雲林縣'
                                                ? { lat: 23.75585, lng: 120.3897 }
                                                : toConvenceFrom.convenceCountry === '高雄市'
                                                  ? { lat: 23.01087, lng: 120.666 }
                                                  : { lat: 23.6, lng: 121 };
  return (
    // AIzaSyDcDVpo-0xdVNcs0_HDYD0QKQPDfJ4QAQk
    <LoadScript googleMapsApiKey={'AIzaSyDcDVpo-0xdVNcs0_HDYD0QKQPDfJ4QAQk'}>
      <GoogleMap
        mapContainerClassName="my-map"
        center={center}
        zoom={
          toConvenceFrom.convenceStore !== ''
            ? 20
            : toConvenceFrom.convenceCountry !== ''
              ? 8
              : 5
        }
      >
        {toConvenceFrom.convenceStore !== '' ? (
          <>
            <Marker
              onClick={() => {
                let i = confirm(
                  `確定選取${toConvenceFrom.convenceStore}嗎?選取後就無法更改囉!`
                );
                i.then((res) => {
                  if (res === true) {
                    alert('選取成功!');
                    setIsDisable((prev) => !prev);
                  }
                });
              }}
              position={{
                lat: storeArr[convenceCountryInd][
                  toConvenceFrom.convenceTownship
                ].filter(
                  (v, i) =>
                    v['POIName'] === toConvenceFrom.convenceStore.slice(0, 2)
                )[0]['Y'],
                lng: storeArr[convenceCountryInd][
                  toConvenceFrom.convenceTownship
                ].filter(
                  (v, i) =>
                    v['POIName'] === toConvenceFrom.convenceStore.slice(0, 2)
                )[0]['X'],
              }}
            ></Marker>
          </>
        ) : null}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MyMap);
