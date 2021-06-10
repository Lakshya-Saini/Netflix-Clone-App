import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = (props) => {
  return (
    <div className="video-player">
      <ReactPlayer
        url={`https://youtube.com/watch?v=${props.match.params.id}`}
        controls={true}
        width="100%"
        height="100vh"
        playing={true}
      />
    </div>
  );
};

export default VideoPlayer;
