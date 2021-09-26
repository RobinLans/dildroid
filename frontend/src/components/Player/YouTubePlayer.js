import { useRef } from "react";
import YouTube from "react-youtube";

function YouTubePlayer(props) {
  const videoPlayer = useRef();

  //Here we send the player element back to SearchResult so that we can use there
  props.sendPlayerBack(videoPlayer.current);

  //Hide the youtube player so that we can use our own custom player controls
  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
    },
  };

  function startVideo() {
    videoPlayer.current.internalPlayer.playVideo();
  }

  function endTheVideo(e) {
    console.log(e.target);
  }

  return (
    <div>
      <YouTube
        opts={opts}
        onReady={startVideo}
        ref={videoPlayer}
        onEnd={(e) => {
          endTheVideo(e);
        }}
      />
    </div>
  );
}

export default YouTubePlayer;
