import { Offcanvas } from 'react-bootstrap';
import { useContext, useState } from 'react';
import './Offcanvas.scss';
import TWZipCode from './TWZipCode';
import axios from 'axios';
import CreditForm from './CreditForm';
import CheckoutFinish from './CheckoutFinish';
import { useNavigate } from 'react-router-dom';
import Convenience from './Convenience';
import AuthContext from '../../../components/AuthContext';
import { useSpinner } from '../../../components/useSpinner/useSpinner';
import { alert } from './AlertComponent';
import { confirm } from './ConfirmComponent';
export default function OffcanvasPage(props) {
  const { loginMemberID, setProductDep, setCustomDep, setLessonDep } = props;
  const { token } = useContext(AuthContext);
  const { spinner, setLoading } = useSpinner(1500);
  const navigate = useNavigate();
  // offcanvas setting
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 點擊位移單位
  const [displace, setDisplace] = useState(0);

  // 新訂單編號
  const [newOrderNumber, setNewOrderNumber] = useState(0);

  // 宅配form setting
  const [toHomeForm, setToHomeForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    countryName: '',
    townshipName: '',
    fullAddress: '',
  });
  // 超商form setting
  const [toConvenceFrom, setToConvenceFrom] = useState({
    fullName: '',
    mobile: '',
    email: '',
    convenceCountry: '',
    convenceTownship: '',
    convenceStore: '',
  });
  // 信用卡表單
  const [creditForm, setCreditForm] = useState({
    num_1: '',
    num_2: '',
    num_3: '',
    num_4: '',
    validMonth: '',
    validYear: '',
    CVV: '',
  });
  const [creditResult, setCreditResult] = useState({});
  // error message setting
  const [formErrorMsg, setFormErrorMsg] = useState({
    nameMsg: '',
    mobileMsg: '',
    emailMsg: '',
    addressMsg: '',
  });
  const [delivery, setDelivery] = useState('toHome');
  const [paySelected, setPaySelected] = useState('credit');
  const [isCheckoutFinish, setIsCheckoutFinish] = useState(false);
  // 宅配欄位handler
  const toHomeFormHandler = (e) => {
    setToHomeForm({ ...toHomeForm, [e.target.name]: e.target.value });
  };
  // 填完基本資料下一步
  const nextStep = (e) => {
    // 如果選擇宅配
    if (delivery === 'toHome') {
      // 如果選現金
      if (paySelected === 'cash') {
        if (
          toHomeForm.fullName !== '' &&
          toHomeForm.mobile !== '' &&
          toHomeForm.email !== '' &&
          toHomeForm.countryName !== '' &&
          toHomeForm.townshipName !== '' &&
          toHomeForm.fullAddress !== ''
        ) {
          // 資料填寫有完整 完成結帳產生訂單編號
          axios
            .post('http://localhost:3000/orders', {
              memID: loginMemberID,
              recipient: toHomeForm.fullName,
              mobile: toHomeForm.mobile,
              email: toHomeForm.email,
              address:
                toHomeForm.countryName +
                toHomeForm.townshipName +
                toHomeForm.fullAddress,
              shipping: delivery,
              pay_method: paySelected,
            })
            .then((res) => {
              if (res.data.success) {
                setNewOrderNumber(res.data.orderNumber);
                let i = alert('恭喜您購買成功，請查看您的訂單編號');
                i.then((res) => {
                  if (res === true) {
                    setToHomeForm({
                      fullName: '',
                      mobile: '',
                      email: '',
                      countryName: '',
                      townshipName: '',
                      fullAddress: '',
                    });
                    setProductDep((prev) => prev + 1);
                    setCustomDep((prev) => prev + 1);
                    setLessonDep((prev) => prev + 1);
                    setDisplace(displace + 200);
                    setIsCheckoutFinish(true);
                  }
                });
              } else {
                console.log(res.data.msg);
                setFormErrorMsg(res.data.msg);
                alert(res.data.error);
              }
            });
        } else {
          // 資料沒填完整
          alert('資料填寫不完整');
        }
        // 如果選信用卡
      } else if (paySelected === 'credit') {
        if (
          toHomeForm.fullName !== '' &&
          toHomeForm.mobile !== '' &&
          toHomeForm.email !== '' &&
          toHomeForm.countryName !== '' &&
          toHomeForm.townshipName !== ''
        ) {
          // 寄送資料都有填就導向信用卡填寫頁面
          setDisplace(displace + 100);
        } else {
          // 資料沒填完整
          alert('資料填寫不完整');
        }
      }
    }
    // 如果選擇超商取貨
    if (delivery === 'pickSelf') {
      // 如果選現金
      if (paySelected === 'cash') {
        if (
          toConvenceFrom.fullName !== '' &&
          toConvenceFrom.mobile !== '' &&
          toConvenceFrom.email !== '' &&
          toConvenceFrom.convenceCountry !== '' &&
          toConvenceFrom.convenceTownship !== '' &&
          toConvenceFrom.convenceStore !== ''
        ) {
          // 資料填寫有完整 完成結帳產生訂單編號
          axios
            .post('http://localhost:3000/orders', {
              memID: loginMemberID,
              recipient: toConvenceFrom.fullName,
              mobile: toConvenceFrom.mobile,
              email: toConvenceFrom.email,
              address:
                toConvenceFrom.convenceCountry +
                toConvenceFrom.convenceTownship +
                toConvenceFrom.convenceStore,
              shipping: delivery,
              pay_method: paySelected,
            })
            .then((res) => {
              if (res.data.success) {
                setNewOrderNumber(res.data.orderNumber);
                let i = alert('恭喜您購買成功，請查看您的訂單編號');
                i.then((res) => {
                  if (res === true) {
                    setProductDep((prev) => prev + 1);
                    setCustomDep((prev) => prev + 1);
                    setLessonDep((prev) => prev + 1);
                    setDisplace(displace + 200);
                    setIsCheckoutFinish(true);
                  }
                });
              } else {
                setFormErrorMsg(res.data.msg);
                alert(res.data.error);
              }
            });
        } else {
          // 資料沒填完整
          alert('資料填寫不完整');
        }
        // 如果選信用卡
      } else if (paySelected === 'credit') {
        if (
          toConvenceFrom.fullName !== '' &&
          toConvenceFrom.mobile !== '' &&
          toConvenceFrom.email !== '' &&
          toConvenceFrom.convenceCountry !== '' &&
          toConvenceFrom.convenceTownship !== '' &&
          toConvenceFrom.convenceStore !== ''
        ) {
          // 寄送資料都有填就導向信用卡填寫頁面
          setDisplace(displace + 100);
        } else {
          // 資料沒填完整
          alert('資料填寫不完整');
        }
      }
    }
  };
  // 填完信用卡下一步
  const creditNextStep = (e) => {
    // 先檢查所有信用卡欄位有無甜寫
    if (
      creditForm.num_1 !== '' &&
      creditForm.num_2 !== '' &&
      creditForm.num_3 !== '' &&
      creditForm.num_4 !== '' &&
      creditForm.validMonth !== '' &&
      creditForm.validYear !== '' &&
      creditForm.CVV !== ''
    ) {
      // 發AJAX到 TabPay 介接路由
      axios
        .post('http://localhost:3000/orders/pay-credit', creditForm)
        .then((res) => {
          // 如果回傳成功
          if (res.data.result.status === 0) {
            setCreditResult(res.data.result);
            // 上一部選擇宅配
            if (delivery === 'toHome') {
              axios
                .post('http://localhost:3000/orders', {
                  memID: loginMemberID,
                  recipient: toHomeForm.fullName,
                  mobile: toHomeForm.mobile,
                  email: toHomeForm.email,
                  address:
                    toHomeForm.countryName +
                    toHomeForm.townshipName +
                    toHomeForm.fullAddress,
                  shipping: delivery,
                  pay_method: paySelected,
                })
                .then((res) => {
                  if (res.data.success) {
                    setNewOrderNumber(res.data.orderNumber);
                    let i = alert('恭喜您購買成功，請查看您的訂單編號');
                    i.then((res) => {
                      if (res === true) {
                        setToHomeForm({
                          fullName: '',
                          mobile: '',
                          email: '',
                          countryName: '',
                          townshipName: '',
                          fullAddress: '',
                        });
                        setProductDep((prev) => prev + 1);
                        setCustomDep((prev) => prev + 1);
                        setLessonDep((prev) => prev + 1);
                        setDisplace(displace + 100);
                        setIsCheckoutFinish(true);
                      }
                    });
                  } else {
                    setFormErrorMsg(res.data.msg);
                    let i = alert(res.data.error);
                    i.then((res) => {
                      if (res === true) {
                        setDisplace(displace - 100);
                      }
                    });
                  }
                });
              // 上一部選擇超取
            } else {
              axios
                .post('http://localhost:3000/orders', {
                  memID: loginMemberID,
                  recipient: toConvenceFrom.fullName,
                  mobile: toConvenceFrom.mobile,
                  email: toConvenceFrom.email,
                  address:
                    toConvenceFrom.convenceCountry +
                    toConvenceFrom.convenceTownship +
                    toConvenceFrom.convenceStore,
                  shipping: delivery,
                  pay_method: paySelected,
                })
                .then((res) => {
                  if (res.data.success) {
                    setNewOrderNumber(res.data.orderNumber);
                    let i = alert('恭喜您購買成功，請查看您的訂單編號');
                    i.then((res) => {
                      if (res === true) {
                        setProductDep((prev) => prev + 1);
                        setCustomDep((prev) => prev + 1);
                        setLessonDep((prev) => prev + 1);
                        setDisplace(displace + 100);
                        setIsCheckoutFinish(true);
                      }
                    });
                  } else {
                    setFormErrorMsg(res.data.msg);
                    let i = alert(res.data.error);
                    i.then((res) => {
                      if (res === true) {
                        setDisplace(displace - 100);
                      }
                    });
                  }
                });
            }
          }
        });
    } else {
      alert('請填寫完整資料');
    }
  };
  // 上一步
  const prevStep = () => {
    // 不是最後一頁 && 付款方式是信用卡
    if (displace !== 0 && paySelected === 'credit') {
      setDisplace(displace - 100);
    } else {
      setDisplace(0);
    }
  };
  const toHomeMemberDataHandler = (e) => {
    if (e.target.checked) {
      axios
        .get('http://localhost:3000/member/memberself', {
          // 發JWT一定要加這個headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setToHomeForm({
            ...toHomeForm,
            fullName: res.data.mem_name,
            mobile: res.data.mem_mobile,
            email: res.data.mem_email,
          });
        });
    } else {
      setToHomeForm({
        ...toHomeForm,
        fullName: '',
        mobile: '',
        email: '',
      });
    }
  };
  const ConvenceMemberDataHandler = (e) => {
    if (e.target.checked) {
      axios
        .get('http://localhost:3000/member/memberself', {
          // 發JWT一定要加這個headers
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setToConvenceFrom({
            ...toConvenceFrom,
            fullName: res.data.mem_name,
            mobile: res.data.mem_mobile,
            email: res.data.mem_email,
          });
        });
    } else {
      setToConvenceFrom({
        ...toConvenceFrom,
        fullName: '',
        mobile: '',
        email: '',
      });
    }
  };
  const payHandleChange = (e) => {
    setPaySelected(e.target.value);
  };
  return (
    <div className="App">
      <Offcanvas
        backdrop={'static'}
        placement={'end'}
        show={show}
        onHide={handleClose}
      >
        <div className="carts-all-step-wrap">
          <div className="w-100 d-flex justify-content-end close-btn-wrap">
            <Offcanvas.Header closeButton></Offcanvas.Header>
          </div>
          {/* previous step */}
          <div
            style={{ display: !isCheckoutFinish ? 'block' : 'none' }}
            onClick={prevStep}
            className={'back-step'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 w-100 h-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ccc"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </div>
          <div className="check-body-list-wrap w-100">
            <div style={{ left: `-${displace}%` }} className="check-body-list">
              {/* 配送方式頁面 */}
              <div className="distribution-page">
                <div className="w-100 distribution-form-wrap">
                  <div className="w-75 h-90 d-flex flex-column justify-content-between">
                    <div className="w-100 h-10 step-page-title-wrap d-flex justify-content-center align-items-center">
                      <span className="d-block">Distribution</span>
                    </div>
                    <div className="w-100 h-10 d-flex">
                      {/* 配送方式選取 */}
                      <div className="w-50 h-100 d-flex align-items-center">
                        <select
                          onChange={(e) => {
                            setDelivery(e.target.value);
                          }}
                          className="focus-none text-gray bg-transparent border-0 fs-6"
                        >
                          <option value="" disabled>
                            配送方式
                          </option>
                          <option className="text-black" value="toHome">
                            宅配到府
                          </option>
                          <option className="text-black" value="pickSelf">
                            超商取貨
                          </option>
                        </select>
                      </div>
                      {/* 同會員資料 */}
                      <div className="w-50 h-100 d-flex justify-content-end align-items-center">
                        <input
                          type="checkbox"
                          name="toHomeData"
                          onChange={
                            delivery === 'toHome'
                              ? toHomeMemberDataHandler
                              : ConvenceMemberDataHandler
                          }
                        />
                        <label className="text-gray px-2" htmlFor="toHomeData">
                          同會員資料
                        </label>
                      </div>
                    </div>
                    <div className="w-100 h-75">
                      {/* 宅配表單 */}
                      <div
                        className=" w-100 h-100 flex-column justify-content-around"
                        style={{
                          display: delivery === 'pickSelf' ? 'none' : 'flex',
                        }}
                      >
                        <div className="relative">
                          <input
                            className="border-bottom w-100 text-gray bg-transparent checkout-input"
                            name="fullName"
                            value={toHomeForm.fullName}
                            type="text"
                            placeholder="* Name :"
                            onChange={toHomeFormHandler}
                            autoComplete="off"
                          />
                          <span
                            style={{
                              fontSize: '12px',
                              right: '0px',
                              bottom: '0px',
                              color: 'red',
                            }}
                            className="absolute"
                          >
                            {formErrorMsg.nameMsg !== ''
                              ? '* 姓名最少兩個字'
                              : ''}
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            className="border-bottom w-100 text-gray bg-transparent checkout-input"
                            name="mobile"
                            pattern="09\d{2}(\d{6}|-\d{3}-\d{3})"
                            value={toHomeForm.mobile}
                            type="text"
                            placeholder="* Mobile :"
                            onChange={toHomeFormHandler}
                            autoComplete="off"
                          />
                          <span
                            style={{
                              fontSize: '12px',
                              right: '0px',
                              bottom: '0px',
                              color: 'red',
                            }}
                            className="absolute"
                          >
                            {formErrorMsg.mobileMsg !== ''
                              ? '* 手機格式不符'
                              : ''}
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            className=" border-bottom w-100 text-gray bg-transparent checkout-input"
                            name="email"
                            value={toHomeForm.email}
                            type="text"
                            placeholder="* Email :"
                            onChange={toHomeFormHandler}
                            autoComplete="off"
                          />
                          <span
                            style={{
                              fontSize: '12px',
                              right: '0px',
                              bottom: '0px',
                              color: 'red',
                            }}
                            className="absolute"
                          >
                            {formErrorMsg.emailMsg !== ''
                              ? '* Email格式不符'
                              : ''}
                          </span>
                        </div>
                        <TWZipCode
                          toHomeForm={toHomeForm}
                          setToHomeForm={setToHomeForm}
                        />
                        <div className="relative">
                          <input
                            className=" border-bottom w-100 text-gray bg-transparent checkout-input"
                            name="fullAddress"
                            value={toHomeForm.fullAddress}
                            type="text"
                            placeholder="* Address :"
                            onChange={toHomeFormHandler}
                            autoComplete="off"
                          />
                          <span
                            style={{
                              fontSize: '12px',
                              right: '0px',
                              bottom: '0px',
                              color: 'red',
                            }}
                            className="absolute"
                          >
                            {formErrorMsg.addressMsg !== ''
                              ? '* 地址格式不符'
                              : ''}
                          </span>
                        </div>

                        {/* 付款方式選擇 */}
                        <div className="w-100 radio-wrap d-flex">
                          <div className="w-100 d-flex justify-content-around">
                            <input
                              className="pay-radio"
                              type="radio"
                              id="r1"
                              name="rr"
                              value={'cash'}
                              checked={paySelected === 'cash'}
                              onChange={payHandleChange}
                            />
                            <label htmlFor="r1">
                              <span></span>貨到付款
                            </label>
                            <input
                              className="pay-radio"
                              type="radio"
                              id="r2"
                              name="rr"
                              value={'credit'}
                              checked={paySelected === 'credit'}
                              onChange={payHandleChange}
                            />
                            <label htmlFor="r2">
                              <span></span>線上刷卡
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* 超取表單 */}
                      <div
                        className="w-100 h-100"
                        style={{
                          display: delivery === 'toHome' ? 'none' : 'flex',
                        }}
                      >
                        <Convenience
                          toConvenceFrom={toConvenceFrom}
                          setToConvenceFrom={setToConvenceFrom}
                          formErrorMsg={formErrorMsg}
                          setFormErrorMsg={setFormErrorMsg}
                          paySelected={paySelected}
                          setPaySelected={setPaySelected}
                          payHandleChange={payHandleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={nextStep} className="w-100">
                  <span>Next Step</span>
                </button>
              </div>
              {/* 信用卡表單頁面 */}
              <div className="credit-detail-page">
                <div className="w-100 credit-form-wrap">
                  <div className="w-80 h-90">
                    <CreditForm
                      creditForm={creditForm}
                      setCreditForm={setCreditForm}
                    />
                  </div>
                </div>
                <button onClick={creditNextStep} className="w-100">
                  <span>Next Step</span>
                </button>
              </div>
              {/* 結帳完成頁面 */}
              <div className="check-compele-page">
                <div className="w-100 check-compele-wrap">
                  <div className="w-80 h-90">
                    <CheckoutFinish newOrderNumber={newOrderNumber} />
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate('/products');
                  }}
                  className="w-100"
                >
                  Continue to Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas>
      <button className="btn checkout-btn" onClick={handleShow}>
        CHECKOUT
      </button>
    </div>
  );
}
