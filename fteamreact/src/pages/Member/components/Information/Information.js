import React, { useState, useEffect, useContext, useRef } from 'react';
import AvatarForm from './AvatarForm';
import MemberEdit from './MemberEdit';
import PasswordEdit from './PasswordEdit';
import Personal from './Personal';
import '../../styles/Information.scss';
import { MemberContext } from '../../../../App';
import { gsap } from 'gsap';

const Information = () => {
  // 拿到會員個人資料
  const { member } = useContext(MemberContext);
  const [moveTrain, setmoveTrain] = useState('translateY(0%)');
  const [avatarFromNone, setAvatarFromNone] = useState('');
  let editFromNone = '';
  if (moveTrain === 'translateY(-200%)') {
    editFromNone = 'opacity';
  } else {
    editFromNone = '';
  }
  const [informationWrap, setInformationWrap] = useState('h-75');
  const avatarForm = useRef(null);
  useEffect(() => {
    gsap.from(avatarForm.current, {
      opacity: 0,
      y: -250,
      duration: 2.5,
      delay: 0.7,
      // ease: 'expo',
      ease: 'circ',
    });
  }, []);
  return (
    <>
      <div className={`h-25 ${avatarFromNone}`} ref={avatarForm}>
        <AvatarForm member={member} />
      </div>
      <div className={`${informationWrap} memberInformationWrap`}>
        <div
          className="h-100 memberInformationTrain"
          style={{
            transform: moveTrain,
            transition: '0.5s ease',
          }}
          // ref={informationForm}
        >
          {member === [] ? (
            ''
          ) : (
            <>
              <Personal
                setmoveTrain={setmoveTrain}
                setAvatarFromNone={setAvatarFromNone}
                setInformationWrap={setInformationWrap}
                member={member}
              />
              <MemberEdit
                setmoveTrain={setmoveTrain}
                setAvatarFromNone={setAvatarFromNone}
                setInformationWrap={setInformationWrap}
                member={member}
                editFromNone={editFromNone}
              />
              <PasswordEdit setmoveTrain={setmoveTrain} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Information;
