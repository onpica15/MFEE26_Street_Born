import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductTabsBox from './components/ProductTabsBox';
import axios from './commons/axios';
import './styles/ProductDetails.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { alert } from '../../components/AlertComponent';

const ProductDetails = (props) => {
  // 商品細節原始資料
  const [details, setdetails] = useState({
    sid: '',
    img: '',
    name: '',
    brand: '',
    price: 0,
    info: '',
  });

  const { setFavoritesNum, setCartTotalDep } = props;

  // auth為登入判斷(true,false) token為會員JWT的token logout是登出涵式
  const { auth, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // 收藏svg開關
  const [heart, setHeart] = useState(false);

  // 購物車 memId
  const [memId, setMemId] = useState(0);

  // 細節頁誰收藏
  const [detailsWhoFavorites, setDetailsWhoFavorites] = useState([]);

  // 各月份銷售數據
  const [priceData, setPriceData] = useState({
    orderData: 0,
    itemId: 0,
    quantity: '',
  });

  // 拿到該會員已收藏過的產品編號
  const findFetailsWhoFavorites = async () => {
    await axios
      .get(`/product/whoFavorites`, {
        // 發JWT一定要加這個headers
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDetailsWhoFavorites(res.data);
      });
  };

  //紀錄重新渲染時誰收藏;
  const CheckWhoFavorites = detailsWhoFavorites.filter(
    (v) => v === details.sid
  );

  // 該商品資料
  const axiosProductDetails = async (productId) => {
    axios.get(`/product/${productId}`).then((res) => {
      setdetails(res.data);
    });
  };

  // 收藏商品與取消收藏商品;
  const detailsFavorites = async () => {
    // 防止沒有登入會員，拿不到token，server 崩潰
    if (!auth) {
      alert('請先登入會員');
      navigate('/login');
      return;
    }
    const addFavorites = {
      sid: details.sid,
      favoriteImg: details.img,
      favoriteName: details.name,
      favoriteBrand: details.brand,
      favoritePrice: details.price,
    };
    await axios
      .post('/product/favorites', addFavorites, {
        // 發JWT一定要加這個headers
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.success === 'true') {
          let i = alert('商品收藏成功');
          i.then((res) => {
            if (res === true) {
              setCartTotalDep((prev) => prev + 1);
            }
          });
        } else {
          alert('商品取消收藏');
        }
        setHeart(!heart);
        countDetailsFavorites();
      });
  };

  // 商品收藏總數
  const countDetailsFavorites = async () => {
    await axios
      .get(`/product/favoriteCount`, {
        // 發JWT一定要加這個headers
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let favoritesNum = res.data[`count(sid)`];
        setFavoritesNum(favoritesNum);
      });
  };

  // 該商品銷售數據
  const ChartData = async (productId) => {
    axios.get(`/product/priceHistory/${productId}`).then((res) => {
      setPriceData(res.data);
    });
  };

  // 購物車需要的會員id
  const getCartsMemId = () => {
    axios
      .get('/member/memberself', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMemId(res.data.sid);
      });
  };

  // 加入購物車
  const getCarts = () => {
    const addCarts = {
      sid: details.sid,
      type: 'product',
      quantity: 1,
      memID: memId,
    };

    axios.post('/carts', addCarts).then((res) => {
      if (res.data.success === true) {
        let i = alert('商品加入購物車成功');
        i.then((res) => {
          if (res === true) {
            setCartTotalDep((prev) => prev + 1);
          }
        });
      } else {
        alert('商品已經存在購物車');
      }
    });
  };
  console.log(memId);

  const params = useParams();

  useEffect(() => {
    axiosProductDetails(params.productId);
    findFetailsWhoFavorites();
    ChartData(params.productId);
    getCartsMemId();
  }, [params.productId, heart]);

  return (
    <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
      <div className="work-area col-10 pb-5 pe-5 text-danger">
        <div className="d-flex w-100">
          <div className="d-flex mb-5 p-0 m-0  w-100 detailsRwd">
            <div className="col-7 productDetailsImg">
              <img src={`/imgs/Products/${details.img}`} alt="" />
            </div>
            <div className="col-5 productDetail">
              <div className="productDetailBody mb-3">
                <h5 className="detail-name">{details.name}</h5>
                <p className="detail-brand">{details.brand}</p>
                <p className="detail-price">
                  <span>$ {details.price}</span>
                </p>
              </div>

              <div className="detail-int-cart mb-3">
                <button onClick={getCarts}>
                  <span>Add to Carts</span>
                </button>
              </div>
              <div className="detail-int-heart mb-5">
                <button onClick={detailsFavorites}>
                  <span>Favorite</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        display: CheckWhoFavorites.length > 0 ? 'none' : '',
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      style={{
                        display: CheckWhoFavorites.length > 0 ? '' : 'none',
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              <div className="detail-info">
                <h5 className="mb-3">Product details</h5>
                <p>{details.info}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex p-0 m-0 ProductTabsBox w-100">
          <ProductTabsBox
            sid={details.sid}
            priceData={priceData}
            setPriceData={setPriceData}
            setHeart={setHeart}
            heart={heart}
          />
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default ProductDetails;
