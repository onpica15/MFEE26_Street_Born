import React,{useContext,useRef,useEffect} from 'react';
import './Customized.scss';
import { Link } from 'react-router-dom';
import AuthContext from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const Customized = () => {
  const { auth, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const bgRef = useRef();
  const bgpicRef = useRef();
  const cardRef = useRef();

  useEffect(() => {
    gsap.from(bgRef.current, { opacity: 0,x:100,duration:1});
    gsap.from(bgpicRef.current, { opacity: 0, y:100,duration:2});
    gsap.from(cardRef.current, { opacity: 0, x:100,duration:3});
  },[]);
  

  return (
    <>
      <div className="w-100 vh-100 d-flex justify-content-end align-items-end">
        <div className="cus_matte w-100 h-100 ovweflow-hidden">
          <img src="/imgs/Customized/cus_bg_04.png" className="cus-bg" ref={bgRef} />
        </div>

        <div className="work-area col-12 col-md-10 p-0 overflow-hidden">
          <div className="cus_container h-100  ">
            <div className="main_img_container">
              <img
                src="/imgs/Customized/main_board.png"
                className="cus_board_main"
                ref={bgpicRef}
              />
            </div>
            <div className="cus_card" ref={cardRef}>
              <div className="cus_main_card">
                <h2 className="text-info">Make Your Own Board</h2>

                <p className="viv-p">
                  客製化您自己專屬的滑板，與朋友們分享，或是發掘喜歡的作品。
                </p>

                <div onClick={()=>{
                                  if (!auth) {
                  if (window.confirm('是否前往登入會員?')) {
                    navigate('/login');
                  } else {
                    return;
                  }
                } else {
                  navigate('/customized/previous_creations');
                }
                }}>
                  <button className="viv-btn">Create</button>
                  </div>

                <Link to={'/customized/explore'}>
                  <button className="viv-btn">Explore</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customized;
