import React from 'react';
import ReactPlayer from 'react-player/lazy';

const LessonVideoPlay = (props) => {
  const { teacherUrl } = props;
  console.log('teacherUrl:', teacherUrl);
  return (
    <>
      <ReactPlayer
        url={teacherUrl}
        playing={true}
        controls={true}
        width="100%"
        height="100%"
        loop={true}
        muted={true}
      />
    </>
  );
};

export default LessonVideoPlay;

// Lazy load the YouTube player

// export default LessonVideoPlay;
