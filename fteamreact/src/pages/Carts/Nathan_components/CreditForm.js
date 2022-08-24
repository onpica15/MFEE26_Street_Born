import axios from 'axios';
import React, { useState } from 'react';
import './CreditForm.scss';
const CreditForm = (props) => {
  const { creditForm, setCreditForm } = props;
  // credit form obj useState setting
  const creditFormHandler = (e) => {
    setCreditForm({ ...creditForm, [e.target.name]: e.target.value });
  };
  const keyPressHandler = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  // 卡片翻轉設定
  const [rotateDeg, setRotateDeg] = useState(0);
  const rotateToZero = () => {
    setRotateDeg(0);
  };
  const rotateToBack = () => {
    setRotateDeg(180);
  };
  // 填完4碼 跳轉下個 input focus 設定 + 填完16碼 發ajax 判斷卡種
  const [cardType, setCardType] = useState('請輸入卡號');
  const numOfFields = 4;
  const handleKeyUp = (e) => {
    // 填完4碼 跳轉下個 input focus 設定
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split('_');
    // Check if they hit the max character length
    if (value.length >= maxLength) {
      // Check if it's not the last input field
      if (parseInt(fieldIndex, 10) < 4) {
        // Get the next input field
        const nextSibling = document.querySelector(
          `input[name=num_${parseInt(fieldIndex, 10) + 1}]`
        );

        // If found, focus the next field
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    }

    // 填完16碼 發ajax 判斷卡種
    const creditFormNumber =
      creditForm.num_1 + creditForm.num_2 + creditForm.num_3 + creditForm.num_4;
    if (creditFormNumber.length > 15) {
      axios
        .get(
          `http://localhost:3000/orders/card-type?cardNumber=${creditFormNumber}`
        )
        .then((res) => {
          setCardType(res.data);
        });
    } else {
      setCardType('請輸入卡號');
    }
  };
  // 一鍵帶入測試卡號
  const oneKeyPressHandler = () => {
    if (creditForm.num_1 !== '') {
      setCreditForm({
        num_1: '',
        num_2: '',
        num_3: '',
        num_4: '',
        validMonth: '',
        validYear: '',
        CVV: '',
      });
    } else {
      setCreditForm({
        num_1: '4242',
        num_2: '4242',
        num_3: '4242',
        num_4: '4242',
        validMonth: '01',
        validYear: '23',
        CVV: '123',
      });
    }
  };
  return (
    <div className="w-100 h-100 d-flex flex-column">
      <div
        className="w-100 h-10 d-flex step-page-title-wrap justify-content-center align-items-center"
        onClick={oneKeyPressHandler}
      >
        <span className="d-block">Card Details</span>
      </div>
      <div className=" w-100 h-90 d-flex flex-column justify-content-around">
        <div className=" w-100 h-20">
          <div className=" w-100 h-35 d-flex justify-content-start align-items-center text-gray">
            <span>Select Card Type</span>
          </div>
          <div className=" w-100 h-65 d-flex justify-content-between">
            <div className="w-33 d-flex justify-content-center align-items-center">
              <svg
                className=" w-50 h-50"
                xmlns="http://www.w3.org/2000/svg"
                height="812"
                viewBox="0.5 0.5 999 323.684"
                width="2500"
              >
                <path
                  d="M651.185.5c-70.933 0-134.322 36.766-134.322 104.694 0 77.9 112.423 83.28 112.423 122.415 0 16.478-18.884 31.229-51.137 31.229-45.773 0-79.984-20.611-79.984-20.611l-14.638 68.547s39.41 17.41 91.734 17.41c77.552 0 138.576-38.572 138.576-107.66 0-82.316-112.89-87.537-112.89-123.86 0-12.91 15.501-27.053 47.662-27.053 36.286 0 65.892 14.99 65.892 14.99l14.326-66.204S696.614.5 651.185.5zM2.218 5.497L.5 15.49s29.842 5.461 56.719 16.356c34.606 12.492 37.072 19.765 42.9 42.353l63.51 244.832h85.138L379.927 5.497h-84.942L210.707 218.67l-34.39-180.696c-3.154-20.68-19.13-32.477-38.685-32.477H2.218zm411.865 0L347.449 319.03h80.999l66.4-313.534h-80.765zm451.759 0c-19.532 0-29.88 10.457-37.474 28.73L709.699 319.03h84.942l16.434-47.468h103.483l9.994 47.468H999.5L934.115 5.497h-68.273zm11.047 84.707l25.178 117.653h-67.454z"
                  fill="rgb(207, 207, 207)"
                />
              </svg>
            </div>
            <div className="w-33 d-flex justify-content-center align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="lightgray"
                viewBox="0 0 50 50"
                width="40px"
                height="40px"
              >
                <path d="M 5 7 C 2.25 7 0 9.25 0 12 L 0 38 C 0 40.75 2.25 43 5 43 L 45 43 C 47.75 43 50 40.75 50 38 L 50 12 C 50 9.25 47.75 7 45 7 Z M 5 9 L 45 9 C 46.667969 9 48 10.332031 48 12 L 48 38 C 48 39.667969 46.667969 41 45 41 L 5 41 C 3.332031 41 2 39.667969 2 38 L 2 12 C 2 10.332031 3.332031 9 5 9 Z M 21.1875 21.90625 C 19.355469 21.90625 17.875 23.355469 17.875 25.15625 C 17.875 26.976563 19.316406 28.375 21.15625 28.375 C 21.675781 28.375 22.136719 28.289063 22.6875 28.03125 L 22.6875 26.59375 C 22.203125 27.078125 21.765625 27.28125 21.21875 27.28125 C 20 27.28125 19.125 26.410156 19.125 25.15625 C 19.125 23.96875 20.023438 23.03125 21.15625 23.03125 C 21.730469 23.03125 22.183594 23.226563 22.6875 23.71875 L 22.6875 22.3125 C 22.15625 22.042969 21.707031 21.90625 21.1875 21.90625 Z M 15.46875 21.9375 C 14.371094 21.9375 13.53125 22.703125 13.53125 23.71875 C 13.53125 24.570313 13.933594 25.011719 15.0625 25.4375 C 15.71875 25.683594 16.25 25.808594 16.25 26.40625 C 16.25 26.910156 15.851563 27.28125 15.3125 27.28125 C 14.738281 27.28125 14.277344 27.007813 14 26.46875 L 13.21875 27.21875 C 13.777344 28.035156 14.457031 28.40625 15.375 28.40625 C 16.628906 28.40625 17.5 27.574219 17.5 26.375 C 17.5 25.390625 17.09375 24.941406 15.71875 24.4375 C 14.992188 24.167969 14.78125 23.992188 14.78125 23.65625 C 14.78125 23.265625 15.167969 22.96875 15.6875 22.96875 C 16.050781 22.96875 16.339844 23.117188 16.65625 23.46875 L 17.28125 22.625 C 16.761719 22.171875 16.148438 21.9375 15.46875 21.9375 Z M 26.28125 21.9375 C 24.496094 21.9375 23.03125 23.371094 23.03125 25.15625 C 23.03125 26.941406 24.496094 28.40625 26.28125 28.40625 C 28.066406 28.40625 29.5 26.941406 29.5 25.15625 C 29.5 23.371094 28.066406 21.9375 26.28125 21.9375 Z M 5.90625 22.0625 L 5.90625 28.25 L 7.6875 28.25 C 10.382813 28.25 11 26.121094 11 25.15625 C 11 23.328125 9.648438 22.0625 7.6875 22.0625 Z M 11.5625 22.0625 L 11.5625 28.25 L 12.78125 28.25 L 12.78125 22.0625 Z M 29.28125 22.0625 L 31.90625 28.40625 L 32.5625 28.40625 L 35.25 22.0625 L 33.9375 22.0625 L 32.25 26.21875 L 30.59375 22.0625 Z M 35.78125 22.0625 L 35.78125 28.25 L 39.21875 28.25 L 39.21875 27.1875 L 37 27.1875 L 37 25.53125 L 39.125 25.53125 L 39.125 24.46875 L 37 24.46875 L 37 23.09375 L 39.21875 23.09375 L 39.21875 22.0625 Z M 40 22.0625 L 40 28.25 L 41.21875 28.25 L 41.21875 25.75 L 41.375 25.75 L 43.03125 28.25 L 44.53125 28.25 L 42.59375 25.65625 C 43.503906 25.46875 44 24.824219 44 23.875 C 44 22.714844 43.207031 22.0625 41.8125 22.0625 Z M 41.21875 23.03125 L 41.59375 23.03125 C 42.347656 23.03125 42.75 23.335938 42.75 23.9375 C 42.75 24.558594 42.332031 24.90625 41.5625 24.90625 L 41.21875 24.90625 Z M 7.125 23.09375 L 7.53125 23.09375 C 9.175781 23.09375 9.75 24.183594 9.75 25.15625 C 9.75 25.621094 9.613281 27.1875 7.4375 27.1875 L 7.125 27.1875 Z" />
              </svg>
            </div>
            <div className="w-33 d-flex justify-content-center align-items-center">
              <svg
                className=" w-60 h-60"
                fill="rgb(207,207,207)"
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M26.828 24.572c0 0.378-0.255 0.65-0.622 0.65-0.378 0-0.622-0.289-0.622-0.65s0.244-0.65 0.622-0.65c0.367 0 0.622 0.289 0.622 0.65zM9.561 23.922c-0.395 0-0.622 0.289-0.622 0.65s0.228 0.65 0.622 0.65c0.361 0 0.605-0.272 0.605-0.65-0.006-0.361-0.244-0.65-0.605-0.65zM16.089 23.906c-0.3 0-0.484 0.194-0.528 0.483h1.061c-0.050-0.317-0.244-0.483-0.533-0.483zM22.078 23.922c-0.378 0-0.605 0.289-0.605 0.65s0.228 0.65 0.605 0.65c0.378 0 0.622-0.272 0.622-0.65 0-0.361-0.245-0.65-0.622-0.65zM27.961 25.372c0 0.017 0.017 0.028 0.017 0.061 0 0.017-0.017 0.028-0.017 0.061-0.017 0.017-0.017 0.028-0.028 0.044-0.017 0.017-0.028 0.028-0.061 0.028-0.017 0.017-0.028 0.017-0.061 0.017-0.017 0-0.028 0-0.061-0.017-0.017 0-0.028-0.017-0.044-0.028-0.017-0.017-0.028-0.028-0.028-0.044-0.017-0.028-0.017-0.044-0.017-0.061 0-0.028 0-0.044 0.017-0.061 0-0.028 0.017-0.044 0.028-0.061 0.017-0.017 0.028-0.017 0.044-0.028 0.028-0.017 0.044-0.017 0.061-0.017 0.028 0 0.044 0 0.061 0.017 0.028 0.016 0.044 0.016 0.061 0.028s0.011 0.033 0.028 0.061zM27.839 25.45c0.028 0 0.028-0.017 0.044-0.017 0.017-0.017 0.017-0.028 0.017-0.044s0-0.028-0.017-0.044c-0.016 0-0.028-0.017-0.061-0.017h-0.089v0.194h0.044v-0.078h0.017l0.061 0.078h0.044zM32 6.278v19.556c0 1.472-1.194 2.667-2.667 2.667h-26.667c-1.472 0-2.667-1.194-2.667-2.667v-19.556c0-1.472 1.194-2.667 2.667-2.667h26.667c1.472 0 2.667 1.194 2.667 2.667zM3.556 14.033c0 4.25 3.45 7.694 7.694 7.694 1.511 0 2.994-0.456 4.25-1.283-4.050-3.294-4.022-9.511 0-12.806-1.256-0.833-2.739-1.283-4.25-1.283-4.244-0.005-7.694 3.444-7.694 7.678zM16 20.078c3.917-3.056 3.9-9.011 0-12.083-3.9 3.072-3.917 9.033 0 12.083zM8.094 24.317c0-0.483-0.317-0.8-0.817-0.817-0.256 0-0.528 0.078-0.711 0.361-0.133-0.228-0.361-0.361-0.678-0.361-0.211 0-0.422 0.078-0.589 0.3v-0.244h-0.455v2.039h0.455c0-1.050-0.139-1.678 0.5-1.678 0.567 0 0.456 0.567 0.456 1.678h0.439c0-1.017-0.139-1.678 0.5-1.678 0.567 0 0.455 0.556 0.455 1.678h0.456v-1.278zM10.589 23.556h-0.439v0.244c-0.15-0.183-0.361-0.3-0.65-0.3-0.572 0-1.011 0.456-1.011 1.072 0 0.622 0.439 1.072 1.011 1.072 0.289 0 0.5-0.106 0.65-0.3v0.256h0.439zM12.839 24.978c0-0.833-1.272-0.456-1.272-0.845 0-0.317 0.661-0.266 1.028-0.061l0.183-0.361c-0.522-0.339-1.678-0.333-1.678 0.456 0 0.794 1.272 0.461 1.272 0.833 0 0.35-0.75 0.322-1.15 0.044l-0.194 0.35c0.622 0.422 1.811 0.333 1.811-0.417zM14.806 25.494l-0.122-0.378c-0.211 0.116-0.678 0.244-0.678-0.228v-0.922h0.728v-0.411h-0.728v-0.622h-0.456v0.622h-0.422v0.406h0.422v0.928c0 0.978 0.961 0.8 1.256 0.605zM15.544 24.75h1.528c0-0.9-0.411-1.256-0.967-1.256-0.589 0-1.011 0.439-1.011 1.072 0 1.139 1.256 1.328 1.878 0.789l-0.211-0.333c-0.433 0.356-1.089 0.322-1.217-0.272zM18.828 23.556c-0.255-0.111-0.644-0.1-0.844 0.244v-0.244h-0.456v2.039h0.456v-1.15c0-0.645 0.528-0.561 0.711-0.467zM19.417 24.572c0-0.634 0.645-0.839 1.15-0.467l0.211-0.361c-0.645-0.505-1.817-0.228-1.817 0.833 0 1.1 1.244 1.322 1.817 0.833l-0.211-0.361c-0.511 0.361-1.15 0.145-1.15-0.478zM23.122 23.556h-0.456v0.244c-0.461-0.611-1.661-0.266-1.661 0.772 0 1.067 1.244 1.372 1.661 0.772v0.256h0.456zM24.994 23.556c-0.133-0.067-0.611-0.161-0.844 0.244v-0.244h-0.439v2.039h0.439v-1.15c0-0.611 0.5-0.572 0.711-0.467zM27.233 22.728h-0.439v1.072c-0.456-0.605-1.661-0.283-1.661 0.772 0 1.078 1.25 1.366 1.661 0.772v0.256h0.439zM27.656 18.556v0.256h0.044v-0.256h0.105v-0.044h-0.256v0.044zM28.022 25.433c0-0.028 0-0.061-0.016-0.089-0.017-0.017-0.028-0.044-0.044-0.061s-0.044-0.028-0.061-0.044c-0.028 0-0.061-0.017-0.089-0.017-0.017 0-0.044 0.017-0.078 0.017-0.028 0.017-0.044 0.028-0.061 0.044-0.028 0.016-0.044 0.044-0.044 0.061-0.017 0.028-0.017 0.061-0.017 0.089 0 0.017 0 0.044 0.017 0.078 0 0.017 0.017 0.044 0.044 0.061 0.016 0.017 0.028 0.028 0.061 0.044 0.028 0.016 0.061 0.016 0.078 0.016 0.028 0 0.061 0 0.089-0.016 0.017-0.017 0.044-0.028 0.061-0.044s0.028-0.044 0.044-0.061c0.016-0.033 0.016-0.061 0.016-0.078zM28.2 18.506h-0.078l-0.089 0.194-0.089-0.194h-0.078v0.3h0.044v-0.228l0.089 0.194h0.061l0.078-0.194v0.228h0.061zM28.444 14.033c0-4.234-3.45-7.683-7.694-7.683-1.511 0-2.994 0.455-4.25 1.283 4.006 3.295 4.067 9.528 0 12.806 1.256 0.833 2.75 1.283 4.25 1.283 4.244 0.006 7.694-3.439 7.694-7.689z" />
              </svg>
            </div>
          </div>
        </div>
        {/* 信用卡表單 */}
        <div className=" w-100 h-30 d-flex flex-column justify-content-between">
          <div className="w-100 h-40">
            <div className=" w-100 h-35 text-gray d-flex justify-content-between align-items-center">
              <span>Card Number</span>
              <span>
                {/* 即時顯示卡種 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '24px' }}
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
                ： {cardType}
              </span>
            </div>
            {/* 卡號 */}
            <div className="w-100 h-65 text-gray d-flex justify-content-between align-items-end">
              {/* 1~4 */}
              <input
                onKeyUp={handleKeyUp}
                onKeyPress={keyPressHandler}
                onChange={creditFormHandler}
                name="num_1"
                onFocus={rotateToZero}
                defaultValue={creditForm.num_1}
                type="text"
                className="checkout-input credit-invalid border-bottom w-20 text-gray bg-transparent"
                maxLength={4}
                autoComplete="off"
              />
              {/* 5~8 */}
              <input
                onKeyUp={handleKeyUp}
                onKeyPress={keyPressHandler}
                onChange={creditFormHandler}
                name="num_2"
                onFocus={rotateToZero}
                defaultValue={creditForm.num_2}
                type="text"
                className="checkout-input border-bottom w-20   text-gray bg-transparent"
                maxLength={4}
                autoComplete="off"
              />
              {/* 9~12 */}
              <input
                onKeyUp={handleKeyUp}
                onKeyPress={keyPressHandler}
                onChange={creditFormHandler}
                name="num_3"
                onFocus={rotateToZero}
                defaultValue={creditForm.num_3}
                type="text"
                className="checkout-input border-bottom w-20 text-gray bg-transparent"
                maxLength={4}
                autoComplete="off"
              />
              {/* 13~16 */}
              <input
                onKeyUp={handleKeyUp}
                onKeyPress={keyPressHandler}
                onChange={creditFormHandler}
                name="num_4"
                onFocus={rotateToZero}
                defaultValue={creditForm.num_4}
                type="text"
                className="checkout-input border-bottom w-20 text-gray bg-transparent"
                maxLength={4}
                autoComplete="off"
              />
            </div>
          </div>
          {/* 到期日 驗證碼 */}
          <div className="w-100 h-40 d-flex justify-content-between">
            <div className="w-35 h-100">
              <div className="w-100 h-35 text-gray">
                <span>Expiry Date</span>
              </div>
              <div className="w-100 h-65 d-flex justify-content-between align-items-end text-gray">
                {/* 到期日 XX月*/}
                <input
                  onKeyPress={keyPressHandler}
                  onChange={creditFormHandler}
                  name="validMonth"
                  onFocus={rotateToZero}
                  defaultValue={creditForm.validMonth}
                  className="checkout-input w-40 border-bottom    text-gray bg-transparent"
                  type="text"
                  maxLength={2}
                  placeholder={'MM'}
                  autoComplete="off"
                />
                /{/* YY年 */}
                <input
                  onKeyPress={keyPressHandler}
                  onChange={creditFormHandler}
                  name="validYear"
                  onFocus={rotateToZero}
                  defaultValue={creditForm.validYear}
                  className="checkout-input w-40 border-bottom    text-gray bg-transparent"
                  type="text"
                  maxLength={2}
                  placeholder={'YY'}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="w-20 h-100">
              <div className="w-100 h-35 text-gray">
                <span>CVV</span>
              </div>
              <div className="w-100 h-65 d-flex justify-content-start align-items-end text-gray">
                {/* 驗證碼 */}
                <input
                  onKeyPress={keyPressHandler}
                  onChange={creditFormHandler}
                  name="CVV"
                  onFocus={rotateToBack}
                  defaultValue={creditForm.CVV}
                  className="checkout-input w-100 border-bottom    text-gray bg-transparent"
                  type="text"
                  maxLength={3}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 信用卡翻轉 */}
        <div className="credit-wrap-rwd h-30">
          <div className="flip-card">
            <div
              style={{ transform: `rotateY(${rotateDeg}deg)` }}
              className="flip-card-inner"
            >
              <div className="w-100 flip-card-front">
                <div className="card-info-number-wrap">
                  <div className="w-90 d-flex justify-content-between">
                    <input
                      className="w-15 bg-transparent border-0 credit-card-text"
                      type="text"
                      defaultValue={creditForm.num_1}
                    />
                    <input
                      className="w-15 bg-transparent border-0 credit-card-text"
                      type="text"
                      defaultValue={creditForm.num_2}
                    />
                    <input
                      className="w-15 bg-transparent border-0 credit-card-text"
                      type="text"
                      defaultValue={creditForm.num_3}
                    />
                    <input
                      className="w-15 bg-transparent border-0 credit-card-text"
                      type="text"
                      defaultValue={creditForm.num_4}
                    />
                    <div className="w-30 d-flex justify-content-end text-gray">
                      <input
                        className="text-center w-40 bg-transparent border-0 credit-card-text"
                        type="text"
                        defaultValue={creditForm.validMonth}
                      />

                      {creditForm.validMonth !== '' ||
                        creditForm.validYear !== ''
                        ? '/'
                        : ''}
                      <input
                        className="text-center w-40 bg-transparent border-0 credit-card-text"
                        type="text"
                        defaultValue={creditForm.validYear}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-100 flip-card-back">
                <div className="w-90 cvv-text text-end text-gray">
                  <input
                    className="text-end w-40 bg-transparent border-0 credit-card-text"
                    type="text"
                    defaultValue={creditForm.CVV}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditForm;
