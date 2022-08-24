import React, { useState, useEffect, useRef, useContext } from 'react';
import FilterBox from './components/FilterBox';
import ToolBox from './components/ToolBox';
import './styles/ProductMain.scss';
import axios from './commons/axios';
import ProductList from './components/ProductList';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { gsap } from 'gsap';
import PropagateLoader from 'react-spinners/ScaleLoader';
const ProductMain = (props) => {
  const {
    favoritesNum,
    setFavoritesNum,
    cartTotalDep,
    setCartTotalDep,
    setProductBg,
  } = props;
  // gsap 動畫用
  const productCardRef = useRef(null);
  const toolBoxRef = useRef(null);

  const [loading, setLoading] = useState(false);

  // 原始資料
  //  {
  //     sid:0,
  //     img:'',
  //     name:'',
  //     brand:'',
  //     price:0,
  //  }
  // 商品原始資料
  const [data, setData] = useState([]);

  // post發給後端，先給預設參數，api要加上判斷如果不等於null才執行我要的sql語法
  // API還有兩個參數預設 : 1. orderField = "sid";  2. sort='ASC';
  const [filter, setFilter] = useState({
    categoryId: 0,
    brand: [],
    color: [],
    price: 0,
    orderfield: '',
    sort: '',
    page: 1,
    where: '',
    priceRange: [],
    searchName: '',
    check: false,
    perPage: 15,
  });

  // 複合篩選的文字顯示
  const [messages, setMessages] = useState([]);

  // 瀏覽器重新渲染拿到該會員收藏過的商品
  const [whoFavorites, setWhoFavorites] = useState([]);

  // 商品搜尋
  const searchProducts = (text) => {
    setFilter({ ...filter, searchName: text });
  };

  // scroll 自動渲染下一頁效果
  const getPage = () => {
    setFilter({
      ...filter,
      perPage:
        data.page >= data.totalPages ? data.perPage + 0 : data.perPage + 15,
    });
  };

  // console.log('filter==', filter);
  // console.log('data==', data);

  useEffect(() => {
    axios
      .get('/product', {
        params: {
          categoryId: filter.categoryId,
          brand: filter.brand,
          color: filter.color,
          price: filter.price,
          orderfield: filter.orderfield,
          sort: filter.sort,
          page: filter.page,
          where: filter.where,
          priceRange: filter.priceRange,
          searchName: filter.searchName,
          perPage: filter.perPage,
        },
      })
      .then((res) => {
        setData(res.data);
      });
    //  ----------------------------------------------------------
    window.addEventListener('scroll', function () {
      let navY = this.scrollY;
      let bodyHeight = document.body.scrollHeight;
      let windowHeight = window.innerHeight;
      let scorllPercent = Math.round(
        (navY / (bodyHeight - windowHeight)) * 100
      );

      if (scorllPercent === 100) {
        setLoading(true);
        getPage();
      }
    });
  }, [filter]);

  // GSAP 進場動畫效果
  useEffect(() => {
    gsap.from(productCardRef.current, {
      opacity: 0,
      x: -200,
      duration: 3,
      ease: 'expo',
    });
    gsap.from(toolBoxRef.current, {
      opacity: 0,
      y: -200,
      duration: 1,
      ease: 'expo',
    });
  }, []);
  useEffect(() => {
    setProductBg(true);
    return () => {
      setProductBg(false);
    };
  }, []);

  // // 自動x秒後關掉動畫
  // useEffect(() => {
  //   if (loading === true) {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 2000);
  //   }
  // }, [loading]);

  return (
    <div className="w-100 d-flex justify-content-end align-items-end">
      <div className="work-area col-10 text-danger">
        <div ref={toolBoxRef}>
          <ToolBox filter={filter} setFilter={setFilter} />
        </div>
        <FilterBox
          filter={filter}
          setFilter={setFilter}
          messages={messages}
          setMessages={setMessages}
          searchProducts={searchProducts}
        />

        <div className="d-flex productText p-0 m-0 flex-wrap">
          {messages.map((msg) => {
            return (
              <button
                className="button-38"
                key={Math.random() * 100}
                onClick={() => {
                  setMessages(
                    messages.filter((v) => {
                      return v !== msg;
                    })
                  );

                  if (filter.brand.includes(msg)) {
                    const brandLikeList = filter.brand.filter((v, i) => {
                      return v !== msg;
                    });
                    setFilter({ ...filter, brand: brandLikeList });
                  }

                  if (filter.color.includes(msg)) {
                    const colorLikeList = filter.color.filter((v, i) => {
                      return v !== msg;
                    });
                    setFilter({ ...filter, color: colorLikeList });
                  }

                  if (filter.orderfield.includes('name')) {
                    setFilter({
                      ...filter,
                      orderfield: '',
                      sort: '',
                    });
                  }
                  if (filter.orderfield.includes('price')) {
                    setFilter({
                      ...filter,
                      orderfield: '',
                      sort: '',
                    });
                  }
                }}
              >
                {msg}
              </button>
            );
          })}

          <button
            className="button-38 resetBtn"
            style={{ display: messages.length === 0 ? 'none' : '' }}
            onClick={() => {
              setFilter({
                ...filter,
                categoryId: 0,
                brand: [],
                color: [],
                price: 0,
                orderfield: '',
                sort: '',
                page: 1,
                where: '',
                priceRange: [],
              });
              setMessages([]);
            }}
          >
            Reset All Filters
          </button>
        </div>

        <div
          className="product-list p-0 m-0 d-flex flex-wrap"
          ref={productCardRef}
        >
          <TransitionGroup component={null}>
            {data && data.rows ? (
              data.rows.length === 0 ? (
                <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                  <svg
                    width="720"
                    height="720"
                    viewBox="0 0 720 720"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M513.5 131C520.956 131 527 124.956 527 117.5C527 110.044 520.956 104 513.5 104C506.044 104 500 110.044 500 117.5C500 124.956 506.044 131 513.5 131ZM145 265C145 326.312 181.064 379.201 233.136 403.61C255.86 484.607 330.244 544 418.5 544C524.815 544 611 457.815 611 351.5C611 245.185 524.815 159 418.5 159C415.171 159 411.861 159.085 408.573 159.252C380.718 130.134 341.477 112 298 112C213.5 112 145 180.5 145 265ZM151 354.5C151 361.956 144.956 368 137.5 368C130.044 368 124 361.956 124 354.5C124 347.044 130.044 341 137.5 341C144.956 341 151 347.044 151 354.5ZM128.5 236C132.09 236 135 233.09 135 229.5C135 225.91 132.09 223 128.5 223C124.91 223 122 225.91 122 229.5C122 233.09 124.91 236 128.5 236Z"
                      fill="url(#paint0_radial_132_4)"
                    />
                    <path
                      d="M145 538L295 491.234V341L145 387.766V538Z"
                      fill="#5FC7C0"
                    />
                    <path
                      d="M445 538L295 491.234V341L445 387.766V538Z"
                      fill="#5BEAE1"
                    />
                    <path
                      d="M145 388L295 434.766V605L145 558.234V388Z"
                      fill="#D9D9D9"
                    />
                    <path
                      d="M145 388L295 434.766L258 485.5L108 438.734L145 388Z"
                      fill="#EAEAEA"
                    />
                    <path
                      d="M446 388L295 434.766V605L446 558.234V388Z"
                      fill="#F1F1F1"
                    />
                    <path
                      d="M445 388L295 434.766L332 485.5L482 438.734L445 388Z"
                      fill="#FBFBFB"
                    />
                    <path
                      d="M174.5 152L182.468 173.532L204 181.5L182.468 189.468L174.5 211L166.532 189.468L145 181.5L166.532 173.532L174.5 152Z"
                      fill="#5BEAE1"
                    />
                    <path
                      d="M497.5 311L505.468 332.532L527 340.5L505.468 348.468L497.5 370L489.532 348.468L468 340.5L489.532 332.532L497.5 311Z"
                      fill="#5BEAE1"
                    />
                    <path
                      d="M504.5 556L512.468 577.532L534 585.5L512.468 593.468L504.5 615L496.532 593.468L475 585.5L496.532 577.532L504.5 556Z"
                      fill="#3F464C"
                    />
                    <path
                      d="M366.5 45L374.468 66.5323L396 74.5L374.468 82.4677L366.5 104L358.532 82.4677L337 74.5L358.532 66.5323L366.5 45Z"
                      fill="#3F464C"
                    />
                    <path
                      d="M508 262L510.701 269.299L518 272L510.701 274.701L508 282L505.299 274.701L498 272L505.299 269.299L508 262Z"
                      fill="#5BEAE1"
                    />
                    <path
                      d="M295 205L298.781 215.219L309 219L298.781 222.781L295 233L291.219 222.781L281 219L291.219 215.219L295 205Z"
                      fill="#5BEAE1"
                    />
                    <path
                      d="M218 292L221.511 301.489L231 305L221.511 308.511L218 318L214.489 308.511L205 305L214.489 301.489L218 292Z"
                      fill="#5BEAE1"
                    />
                    <path
                      d="M312.325 422C289.527 406.477 246.189 367.42 255.219 335.373C266.508 295.314 372.75 305.329 414.584 287.302C456.417 269.276 454.073 208.687 414.584 208.687C378 208.687 299.781 184.91 286.5 145.5C280.014 126.252 279.345 94.186 275.804 81"
                      stroke="#5BEAE1"
                      strokeWidth="7"
                      strokeDasharray="14 14"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_132_4"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(310.5 544) rotate(-74.1508) scale(367.989 408.97)"
                      >
                        <stop stopColor="#5BEAE1" />
                        <stop offset="1" stopColor="#3F454B" />
                      </radialGradient>
                    </defs>
                  </svg>
                  <h1 style={{ color: 'black' }}>
                    Hey...There are no products for this filter
                  </h1>
                </div>
              ) : (
                data.rows.map((r) => {
                  return (
                    <CSSTransition
                      classNames="product-item"
                      timeout={300}
                      key={r.id}
                    >
                      <ProductList
                        sid={r.sid}
                        img={r.img}
                        name={r.name}
                        brand={r.brand}
                        price={r.price}
                        info={r.info}
                        favoritesNum={favoritesNum}
                        setFavoritesNum={setFavoritesNum}
                        whoFavorites={whoFavorites}
                        setWhoFavorites={setWhoFavorites}
                        cartTotalDep={cartTotalDep}
                        setCartTotalDep={setCartTotalDep}
                      />
                    </CSSTransition>
                  );
                })
              )
            ) : null}
          </TransitionGroup>
        </div>

        <div className="row paginationBox p-0 m-0">
          <div className="col-4">
            <button
              className="button-38"
              style={{
                display: 'none',
              }}
              onClick={getPage}
            >
              Load More
            </button>
          </div>
        </div>
        <div className="loading w-100 d-flex justify-content-center align-items-center">
          {data ? (
            loading === true && data.totalRows !== data.rows.length ? (
              <PropagateLoader
                size={40}
                cssOverride={{ margin: '60px auto' }}
              />
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductMain;
