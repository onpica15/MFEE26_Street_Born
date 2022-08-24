import React from 'react';
import './styles/Products.scss';

const Products = () => {
  return (
    <>
      <div className="row mainPicRow">
        <div className="col-6 mainPic">
          <div className="mainPicText">
            <h2>PRODUCT</h2>
          </div>

          <div className="mainPicText-h2">
            <h2 data-content="PRODUCT">PRODUCT</h2>
          </div>

          <div className="mainPicMore">
            <h2>
              MORE
              <a href="#/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="{2}"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </h2>
          </div>

          <img
            src="/imgs/Products/pexels-jeremy-bishop-2397647.jpg
                        "
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Products;
