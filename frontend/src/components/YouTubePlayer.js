import { useRef } from "react";
import YouTube from "react-youtube";

function YouTubePlayer(props) {
  const videoPlayer = useRef();

  //Here we send the player element back to SearchResult so that we can use there
  props.sendPlayerBack(videoPlayer.current);

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
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
        // videoId={props.videoId}
        opts={opts}
        onReady={startVideo}
        ref={videoPlayer}
      />
    </div>
  );
}

export default YouTubePlayer;
