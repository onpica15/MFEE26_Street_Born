import React from 'react';
import FavoriteCard from './FavoriteCard';
import ScrollBox from '../../../../components/ScrollBox/ScrollBox';
import '../../styles/Favorite.scss';

const Favorite = ({setCartTotalDep}) => {
  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-center">
        <div className="w-100 h-100">
          <div className="d-flex justify-content-center h-08 d-xl-none">
            <button
              className="scrollTopBtn mt-2"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            >
              Top
            </button>
          </div>
          <div className="favoriteWarp h-95">
            <ScrollBox>
              <FavoriteCard setCartTotalDep={setCartTotalDep} />
            </ScrollBox>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorite;
