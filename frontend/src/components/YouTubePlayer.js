import { useRef } from "react";
import YouTube from "react-youtube";

function YouTubePlayer(props) {
  const videoPlayer = useRef();

  props.sendPlayerBack(videoPlayer.current);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  function startVideo(e) {
    console.log(e.target);
    videoPlayer.current.internalPlayer.playVideo();
  }

  return (
    <div>
      <YouTube
        videoId={props.videoId}
        opts={opts}
        onReady={startVideo}
        ref={videoPlayer}
      />
    </div>
  );
}

export default YouTubePlayer;
